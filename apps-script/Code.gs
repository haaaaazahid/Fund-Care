/**
 * Fund Care — Google Apps Script backend
 *
 * 1. Create a Google Sheet for Fund Care.
 * 2. Extensions -> Apps Script.
 * 3. Paste this file into Code.gs.
 * 4. Change ADMIN_PASSWORD below.
 * 5. Run setupSheets() once and approve permissions.
 * 6. Deploy -> New deployment -> Web app -> Execute as Me -> Anyone.
 * 7. Put the /exec URL into .env.local as NEXT_PUBLIC_API_URL.
 */

const CONFIG = {
  SPREADSHEET_ID: '', // Leave blank when this script is bound to the Fund Care Sheet.
  ADMIN_PASSWORD: 'CHANGE_THIS_PASSWORD',
  TOKEN_TTL_SECONDS: 21600,
};

const SHEETS = {
  LEADS: 'Leads',
  APPOINTMENTS: 'Appointments',
};

function spreadsheet_() {
  return CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function setupSheets() {
  const ss = spreadsheet_();
  ensureSheet_(ss, SHEETS.LEADS, ['id', 'name', 'phone', 'email', 'service', 'message', 'status', 'source', 'createdAt']);
  ensureSheet_(ss, SHEETS.APPOINTMENTS, ['id', 'service', 'date', 'time', 'name', 'phone', 'email', 'notes', 'status', 'createdAt']);
  return 'Fund Care sheets ready.';
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  else {
    const existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (existing.join('|') !== headers.join('|')) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  sheet.setFrozenRows(1);
}

function doGet(e) {
  const action = String(e?.parameter?.action || 'health');
  if (action === 'health') return json_({ ok: true, service: 'fund-care-appscript' });
  return json_({ ok: false, error: 'Unsupported GET action.' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e?.postData?.contents || '{}');
    switch (body.action) {
      case 'createLead': return createLead_(body);
      case 'createAppointment': return createAppointment_(body);
      case 'adminLogin': return adminLogin_(body);
      case 'adminList': return adminList_(body);
      case 'adminUpdateStatus': return adminUpdateStatus_(body);
      default: return json_({ ok: false, error: 'Unknown action.' });
    }
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Request could not be processed.' });
  }
}

function createLead_(b) {
  requireFields_(b, ['name', 'phone', 'email']);
  const id = 'lead_' + Utilities.getUuid();
  const sheet = spreadsheet_().getSheetByName(SHEETS.LEADS) || (setupSheets(), spreadsheet_().getSheetByName(SHEETS.LEADS));
  sheet.appendRow([id, clean_(b.name), clean_(b.phone), clean_(b.email), clean_(b.service), clean_(b.message), 'New', 'Contact page', new Date()]);
  return json_({ ok: true, id: id });
}

function createAppointment_(b) {
  requireFields_(b, ['service', 'date', 'time', 'name', 'phone', 'email']);
  const id = 'appt_' + Utilities.getUuid();
  const sheet = spreadsheet_().getSheetByName(SHEETS.APPOINTMENTS) || (setupSheets(), spreadsheet_().getSheetByName(SHEETS.APPOINTMENTS));
  sheet.appendRow([id, clean_(b.service), clean_(b.date), clean_(b.time), clean_(b.name), clean_(b.phone), clean_(b.email), clean_(b.notes), 'Pending', new Date()]);
  return json_({ ok: true, id: id });
}

function adminLogin_(b) {
  if (!b.password || b.password !== CONFIG.ADMIN_PASSWORD) return json_({ ok: false, error: 'Invalid admin password.' });
  const token = Utilities.getUuid() + '.' + Utilities.getUuid();
  CacheService.getScriptCache().put('admin:' + token, '1', CONFIG.TOKEN_TTL_SECONDS);
  return json_({ ok: true, token: token });
}

function adminList_(b) {
  requireAdmin_(b.token);
  const ss = spreadsheet_();
  return json_({ ok: true, leads: rows_(ss.getSheetByName(SHEETS.LEADS)), appointments: rows_(ss.getSheetByName(SHEETS.APPOINTMENTS)) });
}

function adminUpdateStatus_(b) {
  requireAdmin_(b.token);
  if (!b.type || !b.id || !b.status) throw new Error('Missing update fields.');
  const name = b.type === 'lead' ? SHEETS.LEADS : b.type === 'appointment' ? SHEETS.APPOINTMENTS : null;
  if (!name) throw new Error('Invalid record type.');
  const sheet = spreadsheet_().getSheetByName(name);
  if (!sheet) throw new Error('Sheet not found.');
  const values = sheet.getDataRange().getValues();
  const idCol = values[0].indexOf('id');
  const statusCol = values[0].indexOf('status');
  for (let r = 1; r < values.length; r++) {
    if (String(values[r][idCol]) === String(b.id)) {
      sheet.getRange(r + 1, statusCol + 1).setValue(clean_(b.status));
      return json_({ ok: true });
    }
  }
  return json_({ ok: false, error: 'Record not found.' });
}

function rows_(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  return values.reverse().map(row => {
    const item = {};
    headers.forEach((h, i) => item[h] = row[i] instanceof Date ? row[i].toISOString() : row[i]);
    return item;
  });
}

function requireAdmin_(token) {
  if (!token || CacheService.getScriptCache().get('admin:' + token) !== '1') throw new Error('Admin session expired. Please log in again.');
}

function requireFields_(body, fields) {
  fields.forEach(field => { if (!String(body[field] || '').trim()) throw new Error('Missing required field: ' + field); });
}

function clean_(value) {
  return String(value ?? '').trim().slice(0, 5000);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

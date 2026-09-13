'use client';

import { useEffect, useState } from 'react';
import { adminList, adminLogin, adminUpdateStatus } from '@/lib/api';

type Row = Record<string, unknown>;

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [leads, setLeads] = useState<Row[]>([]);
  const [appointments, setAppointments] = useState<Row[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('fc-admin-token');
    if (saved) { setToken(saved); load(saved); }
  }, []);

  async function load(t: string) {
    try {
      setLoading(true); setError('');
      const data = await adminList(t);
      setLeads(data.leads || []); setAppointments(data.appointments || []);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load dashboard.'); }
    finally { setLoading(false); }
  }

  async function login() {
    try {
      setLoading(true); setError('');
      const data = await adminLogin(password);
      sessionStorage.setItem('fc-admin-token', data.token);
      setToken(data.token); setPassword(''); await load(data.token);
    } catch (e) { setError(e instanceof Error ? e.message : 'Login failed.'); }
    finally { setLoading(false); }
  }

  async function update(type: 'lead' | 'appointment', id: string, status: string) {
    try { await adminUpdateStatus(token, type, id, status); await load(token); }
    catch (e) { setError(e instanceof Error ? e.message : 'Update failed.'); }
  }

  if (!token) return <main className="min-h-screen flex items-center justify-center px-5 pt-24"><div className="card w-full max-w-md p-8"><p className="eyebrow mb-3">Fund Care</p><h1 className="font-serif text-3xl text-navy dark:text-ink mb-2">Admin dashboard</h1><p className="text-muted text-sm mb-7">Sign in to review enquiries and appointment requests.</p><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} placeholder="Admin password" className="w-full p-3 border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] mb-4" /><button className="btn-gold w-full" onClick={login} disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>{error && <p className="text-red-600 text-sm mt-4">{error}</p>}</div></main>;

  return <main className="wrap pt-28 pb-20"><div className="flex items-end justify-between gap-4 mb-10"><div><p className="eyebrow mb-3">Operations</p><h1 className="font-serif text-4xl text-navy dark:text-ink">Admin dashboard</h1></div><div className="flex gap-2"><button className="btn-outline" onClick={() => load(token)} disabled={loading}>Refresh</button><button className="btn-outline" onClick={() => { sessionStorage.removeItem('fc-admin-token'); setToken(''); }}>Sign out</button></div></div>{error && <p className="text-red-600 text-sm mb-5">{error}</p>}<Section title={`Enquiries (${leads.length})`} rows={leads} type="lead" onStatus={update}/><Section title={`Appointments (${appointments.length})`} rows={appointments} type="appointment" onStatus={update}/></main>;
}

function Section({ title, rows, type, onStatus }: { title: string; rows: Row[]; type: 'lead' | 'appointment'; onStatus: (type: 'lead' | 'appointment', id: string, status: string) => void }) {
  return <section className="mb-12"><h2 className="font-serif text-2xl text-navy dark:text-ink mb-4">{title}</h2><div className="card overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-[var(--line)] text-muted text-left">{type === 'lead' ? <><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Service</th><th className="p-4">Message</th><th className="p-4">Status</th></> : <><th className="p-4">Name</th><th className="p-4">Service</th><th className="p-4">Date / time</th><th className="p-4">Contact</th><th className="p-4">Status</th></>}</tr></thead><tbody>{rows.length ? rows.map((r, i) => <tr key={String(r.id || i)} className="border-b last:border-0 border-[var(--line)] align-top">{type === 'lead' ? <><td className="p-4 font-medium">{String(r.name || '')}</td><td className="p-4">{String(r.phone || '')}<br/>{String(r.email || '')}</td><td className="p-4">{String(r.service || '—')}</td><td className="p-4 max-w-xs">{String(r.message || '—')}</td></> : <><td className="p-4 font-medium">{String(r.name || '')}</td><td className="p-4">{String(r.service || '')}</td><td className="p-4">{String(r.date || '')}<br/>{String(r.time || '')}</td><td className="p-4">{String(r.phone || '')}<br/>{String(r.email || '')}</td></>}<td className="p-4"><select value={String(r.status || '')} onChange={e => onStatus(type, String(r.id), e.target.value)} className="border border-[var(--line)] bg-[var(--bg)] p-2"><option>New</option><option>Pending</option><option>Contacted</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></td></tr>) : <tr><td colSpan={5} className="p-8 text-center text-muted">No records yet.</td></tr>}</tbody></table></div></section>;
}

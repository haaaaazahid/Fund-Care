# Fund Care

Next.js frontend with a Google Apps Script + Google Sheets backend. No Render, Express, MongoDB, Prisma, or separate Node server is required.

## Local setup

1. Deploy `apps-script/Code.gs` as a Google Apps Script Web App.
2. Copy its `/exec` URL.
3. Create `.env.local` from `.env.example` and set `NEXT_PUBLIC_API_URL` to that URL.
4. Run `npm install` and `npm run build`.

Admin dashboard: `/admin`

The first Apps Script deployment should be run as the script owner and accessible to anyone. Change `ADMIN_PASSWORD` before deploying and run `setupSheets()` once.

## Google Sheets

The script creates:
- `Leads`
- `Appointments`

Images/files can later be added through Google Drive without adding a separate server.

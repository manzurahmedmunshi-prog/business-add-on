# BUSINESS ADD-ON – Event Management Platform

**Think Fast. Create Big. Build the Future.**

A reusable full-stack event management website for the BUSINESS ADD-ON three-day business, innovation & entertainment festival in Mumbai.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, **Neon PostgreSQL**, **NextAuth**, **Vercel Blob**, and ready for **Resend**.

---

## What is included in this foundation

- Premium dark + gold public website (Home, About, Agenda, Speakers, Challenges, Tickets, Register, Venue, Sponsors, Contact)
- Configurable event identity and ticket types stored in the database
- Working registration form → unique Registration ID + Ticket Number + QR token
- Admin login + basic dashboard with live stats
- Complete Prisma schema for speakers, sponsors, artists, challenges, SPOCs, check-ins, audit logs
- Seed data for BUSINESS ADD-ON (tickets, sample challenges, proposed speakers)
- **Vercel Blob** integration for image/file uploads
- Student-friendly deployment (GitHub → Vercel)

---

## Quick Deploy (Recommended – No Terminal)

### Step 1 – You already have the code
This repository is ready. Just continue with the services below.

### Step 2 – Create a free Neon database
1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up / log in.
2. Create a new project (choose a region close to India if possible).
3. Copy the **connection string** (it looks like `postgresql://user:pass@host/neondb?sslmode=require`).

### Step 3 – Create a Vercel Blob store
1. In the [Vercel Dashboard](https://vercel.com/dashboard) go to **Storage**.
2. Click **Create Database** → choose **Blob**.
3. Give it a name (e.g. `business-add-on-blob`) and create it.
4. Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable to your project once you link it.  
   You can also copy the token manually from the Blob store settings.

### Step 4 – (Optional) Resend for emails
1. Go to [https://resend.com](https://resend.com) and create an API key.
2. You can start with the free `onboarding@resend.dev` sender.

### Step 5 – Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in with the same GitHub account.
2. Click **Add New… → Project**.
3. Import the repository `business-add-on`.
4. Leave Framework Preset as **Next.js**.
5. Open **Environment Variables** and add the following:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | your Neon connection string | Required |
| `NEXTAUTH_SECRET` | any long random string | e.g. https://generate-secret.vercel.app/32 |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Update after first deploy |
| `BLOB_READ_WRITE_TOKEN` | from Vercel Blob store | Required for uploads |
| `RESEND_API_KEY` | your Resend key | Optional for now |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Optional |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Update after deploy |

6. Click **Deploy**.

> **Tip:** If you create the Blob store *after* importing the project, go to the Blob store → **Connect Project** and select `business-add-on`. Vercel will inject `BLOB_READ_WRITE_TOKEN` automatically.

### Step 6 – Initialize the database
After the first deploy succeeds, run once (locally or via a mentor):

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

**Default admin login (after seeding):**
- Email: `admin@businessaddon.in`
- Password: `Admin@123`

Change this password immediately after first login.

---

## Local Development (optional)

```bash
npm install
cp .env.example .env.local
# fill DATABASE_URL, NEXTAUTH_SECRET, and BLOB_READ_WRITE_TOKEN
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3000

---

## Image Uploads (Vercel Blob)

- Helper: `src/lib/blob.ts`
- API route: `POST /api/upload` (admin-only)
- Accepts images (JPEG, PNG, WebP, GIF) and PDF up to 5 MB
- Returns a public URL you can store in the database

Example usage from an admin form:

```ts
const formData = new FormData();
formData.append('file', file);
formData.append('folder', 'speakers');

const res = await fetch('/api/upload', { method: 'POST', body: formData });
const { url } = await res.json();
```

---

## Project Structure

```
business-add-on/
├── prisma/
│   ├── schema.prisma      # Full database schema
│   └── seed.ts            # BUSINESS ADD-ON seed data
├── src/
│   ├── app/
│   │   ├── (public)/      # Public pages
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # API routes (register, upload, auth)
│   ├── components/
│   ├── lib/               # prisma, auth, blob, utils
│   └── types/
├── .env.example
├── package.json
└── README.md
```

---

## Next features to add (in order)

1. QR code image generation (server-side + store URL in Vercel Blob)
2. Confirmation email via Resend
3. Full admin CRUD for Speakers, Sponsors, Challenges, Ticket Types
4. Event configuration form in admin (with logo/banner upload)
5. SPOC assignment and display on tickets
6. Check-in scanner page
7. Registration list + CSV export
8. Reminder / campaign emails

---

## Important notes from the specification

- Never show a speaker, artist or sponsor as **Confirmed** unless the admin has set that status.
- Venue, dates and attendance numbers are configurable and must not be presented as final until approved.
- All planning assumptions (5k–10k attendees, etc.) remain editable.

---

## Support

This is the **foundation** version. Keep iterating on the same repository — every new feature pushed to `main` will auto-deploy on Vercel.

Repository: https://github.com/manzurahmedmunshi-prog/business-add-on

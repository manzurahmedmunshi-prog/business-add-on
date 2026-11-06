# BUSINESS ADD-ON – Event Management Platform

**Think Fast. Create Big. Build the Future.**

A reusable full-stack event management website for the BUSINESS ADD-ON three-day business, innovation & entertainment festival in Mumbai.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, **Neon PostgreSQL**, **NextAuth**, and ready for **Cloudinary** + **Resend**.

---

## What is included in this foundation

- Premium dark + gold public website (Home, About, Agenda, Speakers, Challenges, Tickets, Register, Venue, Sponsors, Contact)
- Configurable event identity and ticket types stored in the database
- Working registration form → unique Registration ID + Ticket Number + QR token
- Admin login + basic dashboard with live stats
- Complete Prisma schema for speakers, sponsors, artists, challenges, SPOCs, check-ins, audit logs
- Seed data for BUSINESS ADD-ON (tickets, sample challenges, proposed speakers)
- Student-friendly deployment (GitHub → Vercel, no local terminal required for final deploy)

---

## Quick Deploy (Recommended – No Terminal)

### Step 1 – You already have the code
This repository is ready. Just continue with the services below.

### Step 2 – Create a free Neon database
1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up / log in.
2. Create a new project (choose a region close to India if possible).
3. Copy the **connection string** (it looks like `postgresql://user:pass@host/neondb?sslmode=require`).

### Step 3 – Create a Cloudinary account (for images later)
1. Go to [https://cloudinary.com](https://cloudinary.com) and sign up.
2. From the dashboard copy: **Cloud Name**, **API Key**, **API Secret**.

### Step 4 – (Optional) Resend for emails
1. Go to [https://resend.com](https://resend.com) and create an API key.
2. You can start with the free `onboarding@resend.dev` sender.

### Step 5 – Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in with the same GitHub account.
2. Click **Add New… → Project**.
3. Import the repository `business-add-on`.
4. Leave Framework Preset as **Next.js**.
5. Open **Environment Variables** and add the following one by one:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | your Neon connection string | Required |
| `NEXTAUTH_SECRET` | any long random string | e.g. generate at https://generate-secret.vercel.app/32 |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Update after first deploy |
| `CLOUDINARY_CLOUD_NAME` | your cloud name | Required for images |
| `CLOUDINARY_API_KEY` | your API key | |
| `CLOUDINARY_API_SECRET` | your API secret | |
| `RESEND_API_KEY` | your Resend key | Optional for now |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Optional |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Update after deploy |

6. Click **Deploy**.

### Step 6 – Initialize the database
After the first deploy succeeds:

1. In Vercel → your project → **Settings → Environment Variables** make sure `DATABASE_URL` is set.
2. Go to the **Deployments** tab → open the latest deployment → **Runtime Logs** is enough for now.
3. The easiest student-friendly way to push the schema and seed:

   - Option A (recommended): Use the Vercel CLI only once if you have it, or
   - Option B: In Neon SQL Editor run the tables manually later, or
   - Option C: After deploy, visit a one-time setup route (we can add `/api/setup` in a future update).

For the cleanest first experience, after the project is live you (or a mentor) can run locally once:

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

Then the admin account and sample data will exist.

**Default admin login (after seeding):**
- Email: `admin@businessaddon.in`
- Password: `Admin@123`

Change this password immediately after first login.

---

## Local Development (optional)

If you have Node.js installed:

```bash
npm install
cp .env.example .env.local
# fill DATABASE_URL and NEXTAUTH_SECRET
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open http://localhost:3000

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
│   │   └── api/           # API routes
│   ├── components/
│   ├── lib/               # prisma, auth, utils
│   └── types/
├── .env.example
├── package.json
└── README.md
```

---

## Next features to add (in order)

1. QR code image generation (Cloudinary or pure server-side)
2. Confirmation email via Resend
3. Full admin CRUD for Speakers, Sponsors, Challenges, Ticket Types
4. Event configuration form in admin
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

This is the **foundation** version requested. You can keep iterating on the same repository — every new feature can be pushed to `main` and Vercel will auto-deploy.

Repository: https://github.com/manzurahmedmunshi-prog/business-add-on

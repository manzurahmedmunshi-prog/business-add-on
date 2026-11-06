import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  let stats = {
    totalRegistrations: 0,
    confirmed: 0,
    speakers: 0,
    sponsors: 0,
    challenges: 0,
  };

  try {
    const [total, confirmed, speakers, sponsors, challenges] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'CONFIRMED' } }),
      prisma.speaker.count(),
      prisma.sponsor.count(),
      prisma.challenge.count(),
    ]);
    stats = { totalRegistrations: total, confirmed, speakers, sponsors, challenges };
  } catch {}

  return (
    <div className="min-h-screen bg-brand-dark">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-brand-gold font-display font-bold text-lg">
            BUSINESS ADD-ON Admin
          </Link>
          <nav className="hidden md:flex gap-4 text-sm text-white/60">
            <Link href="/admin" className="hover:text-white">Dashboard</Link>
            <Link href="/admin/registrations" className="hover:text-white">Registrations</Link>
            <Link href="/admin/event" className="hover:text-white">Event Config</Link>
            <Link href="/" className="hover:text-white">View Site</Link>
          </nav>
        </div>
        <div className="text-sm text-white/50">
          {session.user?.email} · {(session.user as any).role}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-display text-white mb-8">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="card">
            <p className="text-white/50 text-sm">Total Registrations</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.totalRegistrations}</p>
          </div>
          <div className="card">
            <p className="text-white/50 text-sm">Confirmed</p>
            <p className="text-3xl font-bold text-brand-gold mt-1">{stats.confirmed}</p>
          </div>
          <div className="card">
            <p className="text-white/50 text-sm">Speakers</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.speakers}</p>
          </div>
          <div className="card">
            <p className="text-white/50 text-sm">Sponsors</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.sponsors}</p>
          </div>
          <div className="card">
            <p className="text-white/50 text-sm">Challenges</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.challenges}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-3">Foundation Status</h2>
          <ul className="space-y-2 text-sm text-white/70">
            <li>✓ Public website with BUSINESS ADD-ON branding</li>
            <li>✓ Event configuration & ticket types in database</li>
            <li>✓ Registration engine with unique IDs and QR tokens</li>
            <li>✓ Admin login & basic dashboard</li>
            <li>✓ Prisma schema ready for speakers, sponsors, challenges, SPOCs</li>
            <li className="text-white/40">Next: QR generation, email (Resend), full CRUD modules, Cloudinary uploads</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

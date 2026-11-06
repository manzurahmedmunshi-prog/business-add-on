import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getChallenges() {
  try {
    return await prisma.challenge.findMany({
      where: { event: { isPublished: true } },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    return [];
  }
}

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Signature Business Challenges</h1>
      <p className="text-white/60 text-center mb-4 max-w-2xl mx-auto">
        The central differentiator of BUSINESS ADD-ON is a timed challenge system.
        Participants solve real business problems under strict time limits.
      </p>
      <p className="text-white/40 text-center text-sm mb-12">
        Prizes, funding or mentorship are not guaranteed unless formally confirmed by the organisers.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {challenges.map((c) => (
          <div key={c.id} className="card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              <span className="text-brand-gold text-sm font-medium">{c.durationMinutes} min</span>
            </div>
            <p className="text-white/60 text-sm mb-4">{c.description}</p>
            <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/50">
              {c.status}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/register" className="btn-primary">
          Register for Challenges
        </Link>
      </div>
    </div>
  );
}

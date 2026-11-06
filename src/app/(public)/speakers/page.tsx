import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getSpeakers() {
  try {
    return await prisma.speaker.findMany({
      where: {
        event: { isPublished: true },
        status: { in: ['CONFIRMED', 'INVITED', 'IN_DISCUSSION'] },
      },
      orderBy: [{ isFeatured: 'desc' }, { sortOrder: 'asc' }],
    });
  } catch {
    return [];
  }
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Speakers & Hosts</h1>
      <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
        Only speakers marked as Confirmed by the organisers are shown as confirmed.
        Others appear with their current status.
      </p>

      {speakers.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-white/60">Speaker line-up will be announced soon.</p>
          <p className="text-white/40 text-sm mt-2">
            Proposed and invited speakers are managed in the admin dashboard.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((s) => (
            <div key={s.id} className="card text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/10 mb-4 flex items-center justify-center text-3xl text-brand-gold">
                {s.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-white">{s.name}</h3>
              {s.title && <p className="text-white/60 text-sm">{s.title}</p>}
              {s.company && <p className="text-white/40 text-sm">{s.company}</p>}
              <span className="inline-block mt-3 text-xs px-2 py-1 rounded bg-white/10 text-white/50">
                {s.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

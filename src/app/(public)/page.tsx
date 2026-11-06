import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

async function getData() {
  try {
    const event = await prisma.event.findFirst({
      where: { isPublished: true },
      include: {
        ticketTypes: { where: { isActive: true }, orderBy: { sortOrder: 'asc' }, take: 4 },
        speakers: { where: { status: 'CONFIRMED' }, take: 6 },
        challenges: { where: { status: { in: ['PUBLISHED', 'OPEN'] } }, take: 4 },
      },
    });
    return event;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const event = await getData();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-dark to-brand-dark" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 0%, transparent 40%), radial-gradient(circle at 80% 20%, #1e3a5f 0%, transparent 35%)'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
          <p className="text-brand-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-medium">
            Mumbai · Three Days · Business · Innovation · Entertainment
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            BUSINESS ADD-ON
          </h1>
          <p className="text-xl md:text-2xl text-brand-gold-light font-display italic mb-8">
            Think Fast. Create Big. Build the Future.
          </p>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg mb-10">
            A premium three-day festival where business leaders, entrepreneurs, students,
            investors and creators learn, compete, connect and experience world-class entertainment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-base px-8 py-3.5">
              Get Tickets / Register
            </Link>
            <Link href="/sponsors#partner" className="btn-secondary text-base px-8 py-3.5">
              Become a Sponsor / Partner
            </Link>
          </div>

          <p className="mt-8 text-white/40 text-sm">
            Exact dates and venue will be announced soon. Stay tuned.
          </p>
        </div>
      </section>

      {/* Three Experiences */}
      <section className="py-20 bg-brand-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-4">Three Connected Experiences</h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-14">
            Not a conventional conference. Not just a music festival. A complete platform.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-brand-gold text-4xl font-display font-bold mb-3">01</div>
              <h3 className="text-xl font-semibold text-white mb-3">Business</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Keynotes, panel discussions, fireside chats, networking, sponsor activations
                and a full exhibition zone.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-brand-gold text-4xl font-display font-bold mb-3">02</div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Time-bound challenges: Brand Battle, Startup Sprint, Budget Battle, Crisis Room
                and live investor pitches.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-brand-gold text-4xl font-display font-bold mb-3">03</div>
              <h3 className="text-xl font-semibold text-white mb-3">Entertainment</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Artists, performers, celebrity conversations, hosts and high-energy evening shows
                across all three days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Days */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-14">Three-Day Programme</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card border-l-4 border-l-brand-gold">
              <p className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-2">Day 1</p>
              <h3 className="text-xl font-semibold text-white mb-2">The Inspiration Day</h3>
              <p className="text-white/50 text-sm mb-4">Theme: Learn from the Best</p>
              <p className="text-white/70 text-sm">
                Inauguration, keynotes, entrepreneur talks, celebrity conversations, panels,
                networking and opening challenge rounds.
              </p>
            </div>
            <div className="card border-l-4 border-l-brand-gold">
              <p className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-2">Day 2</p>
              <h3 className="text-xl font-semibold text-white mb-2">The Challenge Day</h3>
              <p className="text-white/50 text-sm mb-4">Theme: Beat the Clock</p>
              <p className="text-white/70 text-sm">
                Business innovation challenges, startup sprints, crisis simulations, mentor
                interactions, expo and evening entertainment.
              </p>
            </div>
            <div className="card border-l-4 border-l-brand-gold">
              <p className="text-brand-gold text-sm font-medium uppercase tracking-wider mb-2">Day 3</p>
              <h3 className="text-xl font-semibold text-white mb-2">The Opportunity Day</h3>
              <p className="text-white/50 text-sm mb-4">Theme: Turn Ideas into Reality</p>
              <p className="text-white/70 text-sm">
                Final pitches, investor interactions, exhibition, awards, closing ceremony
                and headline performance.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/agenda" className="btn-secondary">
              View Full Agenda
            </Link>
          </div>
        </div>
      </section>

      {/* Tickets teaser */}
      {event?.ticketTypes && event.ticketTypes.length > 0 && (
        <section className="py-20 bg-brand-navy/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading text-center mb-4">Ticket Categories</h2>
            <p className="text-white/60 text-center mb-12">Choose the experience that fits you</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.ticketTypes.map((ticket) => (
                <div key={ticket.id} className="card flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-1">{ticket.name}</h3>
                  <p className="text-brand-gold text-2xl font-bold mb-3">
                    {formatCurrency(ticket.price.toString())}
                  </p>
                  <p className="text-white/60 text-sm mb-4 flex-1">{ticket.description}</p>
                  <Link href={`/register?ticket=${ticket.id}`} className="btn-primary text-sm w-full text-center">
                    Select
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-heading mb-6">Ready to be part of it?</h2>
          <p className="text-white/70 mb-8">
            Register now for early access. Sponsors and partners can explore collaboration
            opportunities and submit an enquiry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="btn-primary">
              Get Tickets / Register for Challenges
            </Link>
            <Link href="/sponsors#partner" className="btn-secondary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

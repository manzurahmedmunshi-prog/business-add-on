import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

async function getTickets() {
  try {
    return await prisma.ticketType.findMany({
      where: { isActive: true, event: { isPublished: true } },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    return [];
  }
}

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Tickets</h1>
      <p className="text-white/60 text-center mb-12">Choose your access level for BUSINESS ADD-ON</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tickets.map((t) => (
          <div key={t.id} className="card flex flex-col border border-white/10 hover:border-brand-gold/40 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-1">{t.name}</h3>
            <p className="text-brand-gold text-3xl font-bold mb-3">
              {formatCurrency(t.price.toString())}
            </p>
            <p className="text-white/60 text-sm mb-4">{t.description}</p>
            <ul className="space-y-1.5 mb-6 flex-1">
              {t.benefits.map((b) => (
                <li key={b} className="text-white/70 text-sm flex gap-2">
                  <span className="text-brand-gold">✓</span> {b}
                </li>
              ))}
            </ul>
            <Link href={`/register?ticket=${t.id}`} className="btn-primary text-center text-sm">
              Register
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

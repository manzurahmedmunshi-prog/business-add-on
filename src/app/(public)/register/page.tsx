import { prisma } from '@/lib/prisma';
import RegisterForm from '@/components/public/RegisterForm';

export const dynamic = 'force-dynamic';

async function getTicketTypes() {
  try {
    return await prisma.ticketType.findMany({
      where: { isActive: true, event: { isPublished: true } },
      orderBy: { sortOrder: 'asc' },
    });
  } catch {
    return [];
  }
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { ticket?: string };
}) {
  const tickets = await getTicketTypes();

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Register</h1>
      <p className="text-white/60 text-center mb-10">
        Secure your place at BUSINESS ADD-ON. You will receive a confirmation and unique QR ticket.
      </p>

      {tickets.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-white/60">Registration is not open yet. Please check back soon.</p>
          <p className="text-white/40 text-sm mt-2">(Database connection or seed data may still be pending.)</p>
        </div>
      ) : (
        <RegisterForm tickets={tickets} preselectedTicketId={searchParams.ticket} />
      )}
    </div>
  );
}

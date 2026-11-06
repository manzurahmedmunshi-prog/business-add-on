import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding BUSINESS ADD-ON...');

  // Super Admin
  const passwordHash = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@businessaddon.in' },
    update: {},
    create: {
      email: 'admin@businessaddon.in',
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Admin created:', admin.email);

  // Event
  const event = await prisma.event.upsert({
    where: { id: 'business-add-on-2026' },
    update: {},
    create: {
      id: 'business-add-on-2026',
      name: 'BUSINESS ADD-ON',
      tagline: 'Think Fast. Create Big. Build the Future.',
      description:
        'A large-scale, premium three-day business, innovation, networking and entertainment festival in Mumbai. Bring together business leaders, entrepreneurs, students, professionals, investors, brands, speakers, artists and creators on one platform.',
      category: 'Business Festival',
      timezone: 'Asia/Kolkata',
      venueName: 'To be announced',
      venueAddress: 'Mumbai, Maharashtra, India',
      organizerName: 'BUSINESS ADD-ON Organising Committee',
      organizerEmail: 'hello@businessaddon.in',
      primaryColor: '#d4af37',
      secondaryColor: '#0a0f1a',
      isPublished: true,
    },
  });
  console.log('Event created:', event.name);

  // Pages
  const pages = [
    { slug: 'home', title: 'Home', sortOrder: 0 },
    { slug: 'about', title: 'About the Event', sortOrder: 1 },
    { slug: 'agenda', title: 'Event Agenda', sortOrder: 2 },
    { slug: 'speakers', title: 'Speakers', sortOrder: 3 },
    { slug: 'sponsors', title: 'Sponsors', sortOrder: 4 },
    { slug: 'artists', title: 'Artists & Performers', sortOrder: 5 },
    { slug: 'challenges', title: 'Business Challenges', sortOrder: 6 },
    { slug: 'venue', title: 'Venue & Location', sortOrder: 7 },
    { slug: 'tickets', title: 'Tickets', sortOrder: 8 },
    { slug: 'register', title: 'Register', sortOrder: 9 },
    { slug: 'contact', title: 'Contact', sortOrder: 10 },
    { slug: 'privacy', title: 'Privacy Policy', sortOrder: 11 },
    { slug: 'terms', title: 'Terms and Conditions', sortOrder: 12 },
  ];

  for (const p of pages) {
    await prisma.eventPage.upsert({
      where: { eventId_slug: { eventId: event.id, slug: p.slug } },
      update: {},
      create: {
        eventId: event.id,
        slug: p.slug,
        title: p.title,
        isEnabled: true,
        sortOrder: p.sortOrder,
      },
    });
  }
  console.log('Pages seeded');

  // Ticket Types
  const tickets = [
    {
      name: 'General Admission',
      description: 'Access to all keynotes, panels, exhibition and evening entertainment.',
      price: 2499,
      capacity: 4000,
      benefits: ['All sessions', 'Exhibition access', 'Networking lounge', 'Evening performances'],
      sortOrder: 1,
    },
    {
      name: 'Student Pass',
      description: 'Special pricing for college and university students (valid ID required).',
      price: 999,
      capacity: 2000,
      isStudent: true,
      benefits: ['All sessions', 'Exhibition access', 'Challenge participation eligibility'],
      sortOrder: 2,
    },
    {
      name: 'Challenge Participant',
      description: 'Full access + priority registration for time-bound business challenges.',
      price: 1499,
      capacity: 800,
      isChallenge: true,
      benefits: ['All sessions', 'Challenge arena access', 'Mentor interactions', 'Pitch opportunity'],
      sortOrder: 3,
    },
    {
      name: 'Premium / VIP',
      description: 'Priority seating, VIP lounge, exclusive networking and meet-and-greet opportunities.',
      price: 7999,
      capacity: 300,
      isVip: true,
      benefits: ['Priority seating', 'VIP lounge', 'Exclusive networking', 'Premium merchandise'],
      sortOrder: 4,
    },
  ];

  for (const t of tickets) {
    await prisma.ticketType.create({
      data: {
        eventId: event.id,
        name: t.name,
        description: t.description,
        price: t.price,
        capacity: t.capacity,
        isStudent: t.isStudent || false,
        isVip: t.isVip || false,
        isChallenge: t.isChallenge || false,
        benefits: t.benefits,
        sortOrder: t.sortOrder,
        isActive: true,
      },
    });
  }
  console.log('Ticket types seeded');

  // Sample Speakers (all Proposed / not confirmed)
  const speakers = [
    { name: 'Industry Leader (To be announced)', title: 'Keynote Speaker', company: 'TBA', status: 'PROPOSED' as const, isFeatured: true },
    { name: 'Startup Founder (Invited)', title: 'Fireside Chat', company: 'TBA', status: 'INVITED' as const },
    { name: 'Investor (In Discussion)', title: 'Panelist', company: 'TBA', status: 'IN_DISCUSSION' as const },
  ];

  for (const s of speakers) {
    await prisma.speaker.create({
      data: { eventId: event.id, ...s },
    });
  }
  console.log('Speakers seeded');

  // Challenges
  const challenges = [
    { title: 'Brand Battle', slug: 'brand-battle', durationMinutes: 30, description: 'Create a brand identity and marketing strategy in 30 minutes.' },
    { title: 'Startup Sprint', slug: 'startup-sprint', durationMinutes: 60, description: 'Develop a business idea, customer profile and revenue model.' },
    { title: 'Budget Battle', slug: 'budget-battle', durationMinutes: 30, description: 'Prepare a feasible business plan within a given budget.' },
    { title: 'Business Crisis Room', slug: 'crisis-room', durationMinutes: 20, description: 'Respond to a surprise business disruption.' },
    { title: 'Innovation Challenge', slug: 'innovation-challenge', durationMinutes: 60, description: 'Solve a real consumer or local business problem.' },
    { title: 'Investor Pitch', slug: 'investor-pitch', durationMinutes: 8, description: '5-minute pitch + 3-minute Q&A to judges.' },
  ];

  for (const c of challenges) {
    await prisma.challenge.create({
      data: {
        eventId: event.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        durationMinutes: c.durationMinutes,
        maxTeamSize: 4,
        status: 'DRAFT',
      },
    });
  }
  console.log('Challenges seeded');

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

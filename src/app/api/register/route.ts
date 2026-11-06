import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateRegistrationId, generateTicketNumber, generateQrToken } from '@/lib/utils';
import { z } from 'zod';

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  designation: z.string().optional(),
  city: z.string().optional(),
  ticketTypeId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const event = await prisma.event.findFirst({ where: { isPublished: true } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const ticketType = await prisma.ticketType.findFirst({
      where: { id: data.ticketTypeId, isActive: true, eventId: event.id },
    });
    if (!ticketType) {
      return NextResponse.json({ error: 'Invalid ticket type' }, { status: 400 });
    }

    // Prevent duplicate email for same event
    const existing = await prisma.registration.findFirst({
      where: { email: data.email.toLowerCase(), eventId: event.id, status: { not: 'CANCELLED' } },
    });
    if (existing) {
      return NextResponse.json({ error: 'You are already registered with this email' }, { status: 409 });
    }

    const registration = await prisma.registration.create({
      data: {
        eventId: event.id,
        ticketTypeId: ticketType.id,
        registrationId: generateRegistrationId(),
        ticketNumber: generateTicketNumber(),
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        organization: data.organization,
        designation: data.designation,
        city: data.city,
        status: 'CONFIRMED',
        qrToken: generateQrToken(),
      },
    });

    // TODO: Generate QR image via Cloudinary / local, send email via Resend

    return NextResponse.json({
      success: true,
      registrationId: registration.registrationId,
      ticketNumber: registration.ticketNumber,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

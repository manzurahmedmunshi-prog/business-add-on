'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';

type Ticket = {
  id: string;
  name: string;
  price: any;
  description: string | null;
};

export default function RegisterForm({
  tickets,
  preselectedTicketId,
}: {
  tickets: Ticket[];
  preselectedTicketId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    city: '',
    ticketTypeId: preselectedTicketId || tickets[0]?.id || '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push(`/registration/success?id=${data.registrationId}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-white/70 mb-1.5">Ticket Type *</label>
        <select
          required
          value={form.ticketTypeId}
          onChange={(e) => setForm({ ...form, ticketTypeId: e.target.value })}
          className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
        >
          {tickets.map((t) => (
            <option key={t.id} value={t.id} className="bg-brand-navy">
              {t.name} — {formatCurrency(t.price.toString())}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1.5">Full Name *</label>
        <input
          required
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1.5">Email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
        />
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-1.5">Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/70 mb-1.5">Organization</label>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
            className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1.5">City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Registering...' : 'Complete Registration'}
      </button>

      <p className="text-white/40 text-xs text-center">
        By registering you agree to the event Terms and Privacy Policy.
      </p>
    </form>
  );
}

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-md card">
        <h1 className="text-2xl font-display text-brand-gold text-center mb-2">Admin Login</h1>
        <p className="text-white/50 text-sm text-center mb-8">BUSINESS ADD-ON Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-white/70 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded px-3 py-2.5 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-white/30 text-xs text-center mt-6">
          Default: admin@businessaddon.in / Admin@123 (change after first login)
        </p>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/speakers', label: 'Speakers' },
  { href: '/challenges', label: 'Challenges' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/venue', label: 'Venue' },
  { href: '/tickets', label: 'Tickets' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-brand-gold font-display text-xl md:text-2xl font-bold tracking-wide">
              BUSINESS ADD-ON
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 hover:text-brand-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/register" className="btn-primary text-sm px-5 py-2.5">
              Get Tickets
            </Link>
            <Link href="/sponsors#partner" className="btn-secondary text-sm px-5 py-2.5">
              Become a Sponsor
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-brand-gold py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-3">
                <Link href="/register" className="btn-primary text-center" onClick={() => setOpen(false)}>
                  Get Tickets
                </Link>
                <Link href="/sponsors#partner" className="btn-secondary text-center" onClick={() => setOpen(false)}>
                  Become a Sponsor
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-brand-gold font-display text-xl font-bold mb-3">BUSINESS ADD-ON</h3>
            <p className="text-white/60 text-sm max-w-md">
              Think Fast. Create Big. Build the Future. A three-day premium business, innovation
              and entertainment festival in Mumbai.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-brand-gold">About</Link></li>
              <li><Link href="/agenda" className="hover:text-brand-gold">Agenda</Link></li>
              <li><Link href="/speakers" className="hover:text-brand-gold">Speakers</Link></li>
              <li><Link href="/challenges" className="hover:text-brand-gold">Challenges</Link></li>
              <li><Link href="/tickets" className="hover:text-brand-gold">Tickets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/contact" className="hover:text-brand-gold">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-gold">Terms</Link></li>
              <li><Link href="/admin/login" className="hover:text-brand-gold">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} BUSINESS ADD-ON. All rights reserved. Mumbai, India.
          </p>
          <p className="text-white/40 text-xs">
            Venue, dates and confirmed speakers are subject to final announcement.
          </p>
        </div>
      </div>
    </footer>
  );
}

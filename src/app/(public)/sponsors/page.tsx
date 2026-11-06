import Link from 'next/link';

export default function SponsorsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Sponsors & Partners</h1>
      <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
        Brand visibility, audience engagement, exhibition space, networking and thought-leadership
        opportunities for organisations that want to be part of BUSINESS ADD-ON.
      </p>

      <div className="card text-center py-12 mb-12">
        <p className="text-white/50">Sponsor logos and tiers will appear here once confirmed and approved.</p>
      </div>

      <div id="partner" className="card border border-brand-gold/30">
        <h2 className="text-2xl font-display text-white mb-4">Become a Sponsor / Partner</h2>
        <p className="text-white/70 mb-6">
          Interested in brand presence, product demonstration, exhibition booths, startup discovery
          or strategic partnerships? Submit an enquiry and our team will follow up with packages
          and next steps.
        </p>
        <p className="text-white/50 text-sm mb-6">
          Email: partners@businessaddon.in
        </p>
        <Link href="/contact" className="btn-primary">
          Submit Partnership Enquiry
        </Link>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Contact</h1>
      <p className="text-white/60 text-center mb-10">
        Questions about tickets, challenges, sponsorship or the event?
      </p>

      <div className="card space-y-6">
        <div>
          <h3 className="text-white font-medium mb-1">General Enquiries</h3>
          <p className="text-brand-gold">hello@businessaddon.in</p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">Sponsorship & Partnerships</h3>
          <p className="text-brand-gold">partners@businessaddon.in</p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">Location</h3>
          <p className="text-white/70">Mumbai, Maharashtra, India</p>
        </div>
        <p className="text-white/40 text-sm pt-4 border-t border-white/10">
          A full contact form and SPOC directory will be available once the organising team
          finalises roles.
        </p>
      </div>
    </div>
  );
}

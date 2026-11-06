import Link from 'next/link';

export default function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="card">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-2xl font-display text-white mb-3">Registration Successful</h1>
        <p className="text-white/70 mb-2">Thank you for registering for BUSINESS ADD-ON.</p>
        {searchParams.id && (
          <p className="text-brand-gold font-mono text-sm mb-6">ID: {searchParams.id}</p>
        )}
        <p className="text-white/50 text-sm mb-8">
          A confirmation email with your QR ticket will be sent shortly.
          You can also check your registration status later.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

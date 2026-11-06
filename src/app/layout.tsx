import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'BUSINESS ADD-ON | Think Fast. Create Big. Build the Future.',
  description:
    'A three-day premium business, innovation, networking and entertainment festival in Mumbai. Keynotes, challenges, startups, artists and more.',
  keywords: ['business festival', 'Mumbai', 'startup', 'innovation', 'networking', 'BUSINESS ADD-ON'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

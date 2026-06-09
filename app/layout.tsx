import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PromiseProof — Verified creator challenges',
  description: 'The trust score for creator promises, funded challenges, verified winners, and public payout proof.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import Link from 'next/link';
import type { ReactNode } from 'react';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="logo" aria-label="PromiseProof home">
            <span className="logo-mark">✓</span>
            <span>PromiseProof</span>
          </Link>
          <div className="nav-links">
            <Link href="/explore">Explore</Link>
            <Link href="/verify">Game verification</Link>
            <Link href="/verification-center">Verification center</Link>
            <Link href="/messages">Messages</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="nav-actions">
            <Link href="/dashboard" className="btn btn-primary">Create challenge</Link>
            <details className="menu-wrap">
              <summary className="btn btn-ghost menu-button">☰ Menu</summary>
              <div className="dropdown-panel">
                <div className="dropdown-section-title">Account</div>
                <Link href="/auth"><span>Sign in / create account<small>Email or Google login first</small></span><span>→</span></Link>
                <Link href="/onboarding"><span>Onboarding<small>Link social accounts and payout accounts</small></span><span>→</span></Link>
                <Link href="/socials"><span>Connected socials<small>YouTube, TikTok, Instagram, Twitch</small></span><span>→</span></Link>
                <Link href="/wallet"><span>Wallet & payouts<small>PayPal, Stripe, payout methods</small></span><span>→</span></Link>
                <div className="dropdown-section-title">Trust operations</div>
                <Link href="/messages"><span>Messages<small>Verification chats and meeting links</small></span><span>→</span></Link>
                <Link href="/support"><span>Support center<small>Tickets, disputes, help requests</small></span><span>→</span></Link>
                <Link href="/admin"><span>Admin panel<small>Password locked demo controls</small></span><span>→</span></Link>
              </div>
            </details>
          </div>
        </div>
      </nav>
      {children}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo"><span className="logo-mark">✓</span><span>PromiseProof</span></div>
            <p style={{ marginTop: 12 }}>The trust score for creator promises.</p>
          </div>
          <p>Built for funded challenges, hidden-code hunts, social identity verification, creator messages, disputes, and transparent payouts.</p>
        </div>
      </footer>
    </>
  );
}

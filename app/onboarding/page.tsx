import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';

export default function OnboardingPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> New user setup</div>
            <h1>Link accounts before earning trust.</h1>
            <p className="hero-copy">A user can browse public proof pages, but to create challenges, win payouts, message others, or get verified, they need email login, social links, and payout setup.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>Setup checklist</h2>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">✓</span><b>Account created</b><span>email or Google</span></div>
                <div className="progress-row"><span className="tick">2</span><b>Link social accounts</b><span>YouTube, TikTok, Instagram</span></div>
                <div className="progress-row"><span className="tick">3</span><b>Add payout account</b><span>PayPal / Stripe</span></div>
                <div className="progress-row"><span className="tick">4</span><b>Request verification</b><span>video call with admin</span></div>
                <div className="progress-row"><span className="tick">5</span><b>Start promises</b><span>score begins at 60</span></div>
              </div>
              <div className="btn-row" style={{ marginTop: 18 }}>
                <Link className="btn btn-primary" href="/socials">Link socials</Link>
                <Link className="btn btn-ghost" href="/wallet">Add payout method</Link>
              </div>
            </div>
            <div className="feature-card">
              <h2>Verification status</h2>
              <div className="account-box">
                <span className="status-dot" />
                <div><b>Identity</b><p>Unverified until a real admin/moderator approves the person.</p></div>
                <ProofBadge label="Unverified" tone="gold" />
              </div>
              <div className="account-box">
                <span className="status-dot green" />
                <div><b>Email</b><p>Confirmed through Supabase Auth email or Google OAuth.</p></div>
                <ProofBadge label="Confirmed" tone="green" />
              </div>
              <div className="account-box">
                <span className="status-dot" />
                <div><b>Payout</b><p>Added by user, then reviewed before large rewards.</p></div>
                <ProofBadge label="Pending" tone="gold" />
              </div>
              <p className="notice" style={{ marginTop: 18 }}>Important: store only payment provider IDs/tokens. Never store PayPal passwords, card numbers, or private bank login details.</p>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

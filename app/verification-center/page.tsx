import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ThemedSelect } from '@/components/ThemedSelect';

export default function VerificationCenterPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Human verification center</div>
            <h1>Real people verify real accounts.</h1>
            <p className="hero-copy">Accounts are unverified by default. A human admin or moderator can verify a creator after a video call, social account proof, and payout account check.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="feature-card">
              <h2>How creator verification works</h2>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">1</span><b>Request</b><span>user asks for verification</span></div>
                <div className="progress-row"><span className="tick">2</span><b>Link accounts</b><span>YouTube/socials/payout</span></div>
                <div className="progress-row"><span className="tick">3</span><b>Video call</b><span>Discord or Google Meet</span></div>
                <div className="progress-row"><span className="tick">4</span><b>Admin review</b><span>approve or reject</span></div>
                <div className="progress-row"><span className="tick">5</span><b>Badge</b><span>Verified creator</span></div>
              </div>
            </div>
            <div className="glass form-panel">
              <h2>Request verification</h2>
              <div className="form-grid">
                <ThemedSelect label="Meeting method" options={[{ label: 'Discord voice/video call', value: 'discord' }, { label: 'Google Meet', value: 'google_meet' }, { label: 'Zoom', value: 'zoom' }]} />
                <label className="label">Available time<input className="input" placeholder="Saturday 7 PM EST" /></label>
                <label className="label">What should admin verify?<textarea className="textarea" placeholder="My YouTube channel, Discord account, and PayPal payout email." /></label>
                <button className="btn btn-primary" type="button">Send verification request</button>
                <div className="btn-row"><Link className="btn btn-ghost" href="/messages">Open messages</Link><ProofBadge label="Status: unverified" tone="gold" /></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

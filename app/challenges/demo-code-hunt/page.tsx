import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { proofEvents } from '@/lib/demo';

export default function ChallengePage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Challenge #PP-1028</div>
              <h1>Find the hidden code in my video.</h1>
              <p className="hero-copy">Three secret codes were hidden in a creator video. The creator funded the prize first, locked the winning hash, and PromiseProof marked the first valid submit as the winner.</p>
              <div className="btn-row"><ProofBadge label="Prize funded" tone="green" /><ProofBadge label="Rules locked" tone="blue" /><ProofBadge label="Winner paid" tone="green" /></div>
            </div>
            <div className="glass form-panel">
              <div className="reward-strip"><div><span>Reward secured</span><strong>$25</strong></div><ProofBadge label="Paid" tone="green" /></div>
              <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="kpi"><strong>1st</strong><span>valid code wins</span></div>
                <div className="kpi"><strong>00:14</strong><span>winning timestamp</span></div>
              </div>
              <p className="notice">Public proof hides private payment data. Viewers see the proof status, not the winner’s bank or PayPal details.</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="feature-card">
              <h2>Locked rules</h2>
              <p className="lead">The creator cannot secretly change the reward, deadline, winner method, or code after the challenge starts.</p>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">✓</span><b>Reward</b><span>$25</span></div>
                <div className="progress-row"><span className="tick">✓</span><b>Winner method</b><span>first valid code</span></div>
                <div className="progress-row"><span className="tick">✓</span><b>Verification</b><span>hash match</span></div>
              </div>
            </div>
            <div className="feature-card">
              <h2>Proof trail</h2>
              <div className="timeline">
                {proofEvents.map((event) => (
                  <div className="timeline-item" key={event.title}>
                    <span className="avatar">{event.icon}</span>
                    <div><b>{event.title}</b><p>{event.detail}</p></div>
                    <ProofBadge label={event.status} tone="green" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

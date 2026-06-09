import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { challenges, proofEvents } from '@/lib/demo';

export function generateStaticParams() {
  return challenges.map((challenge) => ({ slug: challenge.slug }));
}

export default function DynamicChallengePage({ params }: { params: { slug: string } }) {
  const challenge = challenges.find((item) => item.slug === params.slug) ?? challenges[0];
  const paid = challenge.status === 'Paid' || challenge.status === 'Verified';

  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Public challenge proof</div>
              <h1>{challenge.title}</h1>
              <p className="hero-copy">{challenge.description}</p>
              <div className="btn-row">
                <ProofBadge label={challenge.funded ? 'Prize funded' : 'Funding pending'} tone={challenge.funded ? 'green' : 'gold'} />
                <ProofBadge label={challenge.rulesLocked ? 'Rules locked' : 'Rules not locked'} tone={challenge.rulesLocked ? 'blue' : 'gold'} />
                <ProofBadge label={paid ? 'Paid/complete' : 'Awaiting result'} tone={paid ? 'green' : 'gold'} />
              </div>
            </div>
            <div className="glass form-panel">
              <div className="reward-strip"><div><span>Reward</span><strong>{challenge.reward}</strong></div><ProofBadge label={challenge.status} tone={paid ? 'green' : 'gold'} /></div>
              <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="kpi"><strong>{challenge.type}</strong><span>challenge type</span></div>
                <div className="kpi"><strong>{challenge.scoreImpact}</strong><span>score impact</span></div>
              </div>
              <p className="notice">This public page should show proof status without exposing private payment or bank details.</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="feature-card">
              <h2>Verification checklist</h2>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">{challenge.funded ? '✓' : '!'}</span><b>Funded</b><span>{challenge.funded ? 'secured before launch' : 'not funded'}</span></div>
                <div className="progress-row"><span className="tick">{challenge.rulesLocked ? '✓' : '!'}</span><b>Rules</b><span>{challenge.rulesLocked ? 'locked' : 'editable'}</span></div>
                <div className="progress-row"><span className="tick">{challenge.winnerVerified ? '✓' : '…'}</span><b>Winner</b><span>{challenge.winnerVerified ? 'verified' : 'pending'}</span></div>
                <div className="progress-row"><span className="tick">{challenge.paidOut ? '✓' : '…'}</span><b>Payout</b><span>{challenge.paidOut ? 'complete' : 'pending'}</span></div>
              </div>
            </div>
            <div className="feature-card">
              <h2>Proof events</h2>
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

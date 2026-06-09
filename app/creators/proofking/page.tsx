import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ChallengeCard } from '@/components/ChallengeCard';
import { challenges } from '@/lib/demo';

export default function CreatorProfilePage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Creator profile</div>
              <h1>ProofKing has a <span className="gradient-text">96</span> Promise Score.</h1>
              <p className="hero-copy">People can check this profile before trusting a giveaway, hidden-code hunt, donation challenge, or game reward.</p>
              <div className="btn-row"><ProofBadge label="Elite proof record" tone="green" /><ProofBadge label="1 dispute" tone="gold" /><ProofBadge label="42 completed" tone="blue" /></div>
            </div>
            <div className="glass form-panel">
              <div className="creator-head">
                <div className="creator-meta"><span className="avatar">🎮</span><div><h2>ProofKing</h2><p>@proofking · gaming creator</p></div></div>
                <div className="score-ring" style={{ ['--score' as any]: 96 }}><strong>96</strong></div>
              </div>
              <div className="mini-stats">
                <div className="mini-stat"><strong>44</strong><span>promises</span></div>
                <div className="mini-stat"><strong>42</strong><span>completed</span></div>
                <div className="mini-stat"><strong>$318</strong><span>paid out</span></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head"><div><h2>Recent promises</h2><p className="lead">Completed promises build trust. Failed or disputed promises reduce the score.</p></div></div>
            <div className="card-grid">{challenges.map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}</div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

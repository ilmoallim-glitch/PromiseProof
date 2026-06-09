import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { ChallengeCard } from '@/components/ChallengeCard';
import { CreatorCard } from '@/components/CreatorCard';
import { ProofBadge } from '@/components/ProofBadge';
import { challenges, creators } from '@/lib/demo';

export default function HomePage() {
  return (
    <Shell>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Creator promises, publicly verified</div>
              <h1>Did they really <span className="gradient-text">pay?</span></h1>
              <p className="hero-copy">
                PromiseProof turns creator challenges into public proof pages: account-linked creators, funded rewards, locked rules, verified winners, payout history, messaging support, and a creator trust score everyone can check.
              </p>
              <div className="btn-row">
                <Link href="/dashboard" className="btn btn-primary">Launch your first challenge</Link>
                <Link href="/explore" className="btn btn-ghost">Explore verified promises</Link>
              </div>
              <div className="hero-stats">
                <div className="stat-pill"><strong>$1.6k</strong><span>demo payouts tracked</span></div>
                <div className="stat-pill"><strong>96%</strong><span>top trust score</span></div>
                <div className="stat-pill"><strong>5</strong><span>proof modes</span></div>
              </div>
            </div>

            <div className="proof-console glass">
              <div className="console-header">
                <div className="window-dots"><i /><i /><i /></div>
                <ProofBadge label="Live proof page" tone="green" />
              </div>
              <div className="challenge-card">
                <div className="card-top">
                  <div className="creator-meta">
                    <span className="avatar">🎮</span>
                    <div>
                      <h3>Hidden code hunt</h3>
                      <p>@proofking · Challenge #PP-1028</p>
                    </div>
                  </div>
                  <ProofBadge label="Paid" tone="green" />
                </div>
                <div className="reward-strip">
                  <div><span>Secured reward</span><strong>$25</strong></div>
                  <ProofBadge label="Rules locked" tone="blue" />
                </div>
                <div className="progress-list">
                  <div className="progress-row"><span className="tick">✓</span><b>Prize funded</b><span>before video</span></div>
                  <div className="progress-row"><span className="tick">✓</span><b>Code matched</b><span>hash proof</span></div>
                  <div className="progress-row"><span className="tick">✓</span><b>Winner verified</b><span>first valid submit</span></div>
                  <div className="progress-row"><span className="tick">✓</span><b>Payout sent</b><span>public ledger</span></div>
                </div>
              </div>
              <div className="floating-token token-1">+30 paid out</div>
              <div className="floating-token token-2">Score 96</div>
              <div className="floating-token token-3">No fake proof</div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>How it works</h2>
                <p className="lead">A creator can promise anything, but only verified promises increase their public score.</p>
              </div>
            </div>
            <div className="grid-3">
              <div className="feature-card"><div className="feature-icon">💰</div><h3>Fund the reward</h3><p>The creator deposits the prize or defines a non-money reward before launching the challenge.</p></div>
              <div className="feature-card"><div className="feature-icon">🔒</div><h3>Lock the rules</h3><p>Prize, deadline, winner method, and verification mode are frozen so viewers can see what changed.</p></div>
              <div className="feature-card"><div className="feature-icon">✅</div><h3>Publish proof</h3><p>The result updates the creator profile with completed, failed, disputed, paid, and identity-verified promises.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Trending challenges</h2>
                <p className="lead">Beautiful public cards that creators can link under YouTube, TikTok, Discord, and livestreams.</p>
              </div>
              <Link href="/explore" className="btn btn-ghost">View all</Link>
            </div>
            <div className="card-grid">
              {challenges.map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Creator trust scores</h2>
                <p className="lead">The leaderboard turns honest promises into reputation. Fake challenges become visible.</p>
              </div>
            </div>
            <div className="card-grid">
              {creators.map((creator) => <CreatorCard key={creator.handle} creator={creator} />)}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

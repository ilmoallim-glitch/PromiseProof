import { Shell } from '@/components/Shell';
import { verificationModes } from '@/lib/verification';
import { ProofBadge } from '@/components/ProofBadge';

export default function VerifyPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Game result verification</div>
            <h1>How PromiseProof knows who won.</h1>
            <p className="hero-copy">There is no single magic way for every game. The site uses the strongest proof available for each challenge: official APIs, controlled match rooms, moderators, screenshots, timestamps, and dispute review.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            {Object.values(verificationModes).map((mode) => (
              <div className="feature-card" key={mode.title}>
                <div className="feature-icon">{mode.trust === 'Highest' ? '🛰️' : mode.trust === 'High' ? '🏟️' : mode.trust === 'Medium' ? '🧑‍⚖️' : mode.trust === 'Lower' ? '📸' : '⚠️'}</div>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <div style={{ marginTop: 16 }}><ProofBadge label={`${mode.trust} trust`} tone={mode.trust === 'Warning' ? 'red' : mode.trust === 'Highest' ? 'green' : mode.trust === 'High' ? 'blue' : 'gold'} /></div>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="feature-card">
              <h2>Best first game formats</h2>
              <p className="lead">Start with games where the winner is easy to prove. Chess is perfect. Private Discord game nights and livestreamed 1v1 games are also good.</p>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">✓</span><b>Chess.com / Lichess</b><span>official game history</span></div>
                <div className="progress-row"><span className="tick">✓</span><b>Steam achievements</b><span>stats-based proof</span></div>
                <div className="progress-row"><span className="tick">✓</span><b>Riot games</b><span>match APIs where approved</span></div>
                <div className="progress-row"><span className="tick">✓</span><b>Private lobbies</b><span>stream + moderator proof</span></div>
              </div>
            </div>
            <div className="feature-card">
              <h2>Leaderboard Crown Rush</h2>
              <p className="lead">A Crown Rush is a timed leaderboard race. The winner is whoever holds the top verified rank at the locked deadline.</p>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">1</span><b>Pick the arena</b><span>game, server, region</span></div>
                <div className="progress-row"><span className="tick">2</span><b>Lock the deadline</b><span>date, time, timezone</span></div>
                <div className="progress-row"><span className="tick">3</span><b>Choose proof</b><span>API or moderator capture</span></div>
                <div className="progress-row"><span className="tick">4</span><b>Crown the winner</b><span>public proof page</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

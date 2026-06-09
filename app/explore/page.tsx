import { Shell } from '@/components/Shell';
import { ChallengeCard } from '@/components/ChallengeCard';
import { CreatorCard } from '@/components/CreatorCard';
import { challenges, creators } from '@/lib/demo';

export default function ExplorePage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Explore public proof</div>
            <h1>Verified challenges people can trust.</h1>
            <p className="hero-copy">Browse funded promises, paid winners, game challenges, hidden-code hunts, and creator trust scores.</p>
            <div className="kpi-row">
              <div className="kpi"><strong>4</strong><span>demo challenges</span></div>
              <div className="kpi"><strong>2</strong><span>paid/verified</span></div>
              <div className="kpi"><strong>1</strong><span>pending result</span></div>
              <div className="kpi"><strong>0</strong><span>fake engagement rewards</span></div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container card-grid">
            {challenges.map((challenge) => <ChallengeCard key={challenge.slug} challenge={challenge} />)}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-head"><div><h2>Top creators</h2><p className="lead">Scores improve when promises are funded, verified, and completed.</p></div></div>
            <div className="card-grid">{creators.map((creator) => <CreatorCard key={creator.handle} creator={creator} />)}</div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

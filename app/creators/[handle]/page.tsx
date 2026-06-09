import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ChallengeCard } from '@/components/ChallengeCard';
import { challenges, creators } from '@/lib/demo';
import { scoreLabel } from '@/lib/scoring';

export function generateStaticParams() {
  return creators.map((creator) => ({ handle: creator.handle.replace('@', '') }));
}

export default function DynamicCreatorPage({ params }: { params: { handle: string } }) {
  const creator = creators.find((item) => item.handle.replace('@', '') === params.handle) ?? creators[0];
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow"><span className="pulse-dot" /> Creator profile</div>
              <h1>{creator.name} has a <span className="gradient-text">{creator.score}</span> Promise Score.</h1>
              <p className="hero-copy">People can check this profile before trusting a giveaway, hidden-code hunt, donation challenge, or game reward.</p>
              <div className="btn-row"><ProofBadge label={scoreLabel(creator.score)} tone="green" /><ProofBadge label={creator.identity === 'Verified' ? 'Identity verified' : 'Identity unverified'} tone={creator.identity === 'Verified' ? 'green' : 'gold'} /><ProofBadge label={`${creator.disputes} disputes`} tone={creator.disputes ? 'gold' : 'green'} /><ProofBadge label={`${creator.completed} completed`} tone="blue" /></div>
            </div>
            <div className="glass form-panel">
              <div className="creator-head">
                <div className="creator-meta"><span className="avatar">{creator.avatar}</span><div><h2>{creator.name}</h2><p>{creator.handle} · {creator.identity === 'Verified' ? 'verified creator' : 'unverified identity'}</p></div></div>
                <div className="score-ring" style={{ ['--score' as any]: creator.score }}><strong>{creator.score}</strong></div>
              </div>
              <div className="mini-stats">
                <div className="mini-stat"><strong>{creator.promises}</strong><span>promises</span></div>
                <div className="mini-stat"><strong>{creator.completed}</strong><span>completed</span></div>
                <div className="mini-stat"><strong>{creator.paid}</strong><span>paid out</span></div>
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

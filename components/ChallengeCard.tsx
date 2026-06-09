import Link from 'next/link';
import { ProofBadge } from './ProofBadge';

type Challenge = {
  slug: string;
  title: string;
  creator: string;
  handle: string;
  avatar: string;
  reward: string;
  status: string;
  type: string;
  description: string;
};

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const tone = challenge.status === 'Paid' ? 'green' : challenge.status === 'Funded' ? 'gold' : 'blue';
  return (
    <Link href={`/challenges/${challenge.slug}`} className="challenge-card">
      <div className="card-top">
        <div className="creator-meta">
          <span className="avatar">{challenge.avatar}</span>
          <div>
            <h3>{challenge.title}</h3>
            <p>{challenge.creator} · {challenge.handle}</p>
          </div>
        </div>
        <ProofBadge label={challenge.status} tone={tone as any} />
      </div>
      <p style={{ color: 'var(--muted)', lineHeight: 1.55 }}>{challenge.description}</p>
      <div className="reward-strip">
        <div>
          <span>Reward</span>
          <strong>{challenge.reward}</strong>
        </div>
        <ProofBadge label={challenge.type} tone="blue" />
      </div>
    </Link>
  );
}

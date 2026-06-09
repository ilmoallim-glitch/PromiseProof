import Link from 'next/link';
import { scoreLabel } from '@/lib/scoring';
import { ProofBadge } from './ProofBadge';

type Creator = {
  name: string;
  handle: string;
  avatar: string;
  score: number;
  promises: number;
  completed: number;
  paid: string;
  disputes: number;
  identity?: string;
};

export function CreatorCard({ creator }: { creator: Creator }) {
  const verified = creator.identity === 'Verified';
  return (
    <Link href="/creators/proofking" className="creator-panel">
      <div className="creator-head">
        <div className="creator-meta">
          <span className="avatar">{creator.avatar}</span>
          <div>
            <h3>{creator.name}</h3>
            <p>{creator.handle} · {scoreLabel(creator.score)}</p>
            <div style={{ marginTop: 8 }}>
              <ProofBadge label={verified ? 'Identity verified' : 'Identity unverified'} tone={verified ? 'green' : 'gold'} />
            </div>
          </div>
        </div>
        <div className="score-ring" style={{ ['--score' as any]: creator.score }}><strong>{creator.score}</strong></div>
      </div>
      <div className="mini-stats">
        <div className="mini-stat"><strong>{creator.promises}</strong><span>Promises</span></div>
        <div className="mini-stat"><strong>{creator.completed}</strong><span>Completed</span></div>
        <div className="mini-stat"><strong>{creator.paid}</strong><span>Paid out</span></div>
      </div>
    </Link>
  );
}

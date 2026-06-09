export type ScoreEvent =
  | 'identity_verified'
  | 'challenge_funded'
  | 'rules_locked'
  | 'winner_verified'
  | 'payout_completed'
  | 'proof_submitted_on_time'
  | 'minor_dispute'
  | 'failed_promise'
  | 'confirmed_scam';

const POINTS: Record<ScoreEvent, number> = {
  identity_verified: 7,
  challenge_funded: 10,
  rules_locked: 10,
  winner_verified: 20,
  payout_completed: 30,
  proof_submitted_on_time: 8,
  minor_dispute: -10,
  failed_promise: -35,
  confirmed_scam: -80,
};

export function calculatePromiseScore(events: ScoreEvent[]): number {
  const raw = events.reduce((sum, event) => sum + POINTS[event], 60);
  return Math.max(0, Math.min(100, raw));
}

export function scoreLabel(score: number): string {
  if (score >= 95) return 'Elite proof record';
  if (score >= 85) return 'Trusted creator';
  if (score >= 70) return 'Good record';
  if (score >= 50) return 'Needs more proof';
  return 'Risky creator';
}

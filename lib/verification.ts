export type VerificationMode =
  | 'api_verified'
  | 'controlled_room_verified'
  | 'judge_verified'
  | 'manual_proof'
  | 'community_dispute';

export const verificationModes: Record<VerificationMode, { title: string; trust: string; description: string }> = {
  api_verified: {
    title: 'API Verified',
    trust: 'Highest',
    description: 'PromiseProof connects to a game/platform API and reads the official match result. This is the cleanest method when the game supports it.'
  },
  controlled_room_verified: {
    title: 'Controlled Match Room',
    trust: 'High',
    description: 'PromiseProof creates or records a private match room with exact usernames, lobby code, deadline, stream link, and moderator notes. A moderator confirms the result after the match.'
  },
  judge_verified: {
    title: 'Moderator Verified',
    trust: 'Medium',
    description: 'A trusted admin/moderator reviews stream footage, usernames, timestamps, screenshots, and the locked challenge rules before confirming the winner.'
  },
  manual_proof: {
    title: 'Manual Proof',
    trust: 'Lower',
    description: 'The creator uploads proof, but it is not automatically confirmed by a trusted source. This can be useful but should give fewer Promise Score points.'
  },
  community_dispute: {
    title: 'Community Dispute',
    trust: 'Warning',
    description: 'Users can challenge a result. Moderators review the case and mark the promise verified, disputed, failed, or refunded.'
  },
};

export function recommendedMode(platform: string): VerificationMode {
  const normalized = platform.toLowerCase();
  if (normalized.includes('lichess') || normalized.includes('chess.com') || normalized.includes('riot') || normalized.includes('steam')) return 'api_verified';
  if (normalized.includes('discord') || normalized.includes('private lobby') || normalized.includes('fortnite') || normalized.includes('roblox')) return 'controlled_room_verified';
  return 'judge_verified';
}

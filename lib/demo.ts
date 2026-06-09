export const challenges = [
  {
    slug: 'demo-code-hunt',
    title: 'Find the hidden code in my video',
    creator: 'ProofKing',
    handle: '@proofking',
    avatar: '🎮',
    reward: '$25',
    status: 'Paid',
    type: 'Hidden Code',
    scoreImpact: '+35',
    funded: true,
    rulesLocked: true,
    winnerVerified: true,
    paidOut: true,
    description: 'Three secret codes are hidden inside a gaming video. First valid submission wins the funded prize.',
  },
  {
    slug: 'one-dollar-boss-fight',
    title: 'Beat me in the boss fight, win $1',
    creator: 'ArcadeMusa',
    handle: '@arcademusa',
    avatar: '🕹️',
    reward: '$1',
    status: 'Funded',
    type: 'Game Result',
    scoreImpact: '+18',
    funded: true,
    rulesLocked: true,
    winnerVerified: false,
    paidOut: false,
    description: 'Viewer challenges the creator. Match proof can be API verified or moderator verified after the stream.',
  },
  {
    slug: 'discord-invite-quest',
    title: 'Solve the riddle, enter the private Discord',
    creator: 'TrustLab',
    handle: '@trustlab',
    avatar: '🧪',
    reward: 'Invite',
    status: 'Verified',
    type: 'Digital Reward',
    scoreImpact: '+20',
    funded: true,
    rulesLocked: true,
    winnerVerified: true,
    paidOut: true,
    description: 'The prize is access instead of money. The proof trail confirms the winner received the invite.',
  },
  {
    slug: 'leaderboard-crown-rush',
    title: 'Leaderboard Crown Rush',
    creator: 'RankRush',
    handle: '@rankrush',
    avatar: '👑',
    reward: '$10',
    status: 'Locked',
    type: 'Leaderboard Proof',
    scoreImpact: '+25',
    funded: true,
    rulesLocked: true,
    winnerVerified: false,
    paidOut: false,
    description: 'A timed leaderboard challenge where the winner is whoever holds the top verified rank at the deadline.',
  }
];

export const creators = [
  {
    name: 'ProofKing',
    handle: '@proofking',
    avatar: '🎮',
    score: 96,
    promises: 44,
    completed: 42,
    paid: '$318',
    disputes: 1,
    identity: 'Verified',
  },
  {
    name: 'ArcadeMusa',
    handle: '@arcademusa',
    avatar: '🕹️',
    score: 88,
    promises: 19,
    completed: 16,
    paid: '$74',
    disputes: 2,
    identity: 'Unverified',
  },
  {
    name: 'TrustLab',
    handle: '@trustlab',
    avatar: '🧪',
    score: 99,
    promises: 61,
    completed: 61,
    paid: '$1.2k',
    disputes: 0,
    identity: 'Verified',
  }
];

export const proofEvents = [
  { title: 'Prize funded', detail: '$25 secured before the video went live', status: 'Verified', icon: '💰' },
  { title: 'Rules locked', detail: 'Creator cannot edit the entry deadline or prize amount', status: 'Locked', icon: '🔒' },
  { title: 'Winning code submitted', detail: 'Code hash matched the creator’s pre-locked code', status: 'Matched', icon: '🔐' },
  { title: 'Winner paid', detail: 'Payout marked complete through the platform ledger', status: 'Paid', icon: '✅' }
];

export const socialAccounts = [
  { platform: 'YouTube', handle: '@ProofKing', status: 'Connected', verification: 'Verified by OAuth + admin call', icon: '▶️' },
  { platform: 'Discord', handle: 'proofking#1028', status: 'Connected', verification: 'Verification room scheduled', icon: '💬' },
  { platform: 'TikTok', handle: '@proofking', status: 'Pending', verification: 'Waiting for admin review', icon: '🎵' },
  { platform: 'Instagram', handle: '@proofking', status: 'Unverified', verification: 'Add profile link or live call proof', icon: '📸' },
];

export const payoutAccounts = [
  { provider: 'Stripe Express', label: 'Creator wallet', status: 'Ready for payouts', note: 'Best for platform payouts later' },
  { provider: 'PayPal', label: 'paypal.me/proofking', status: 'Pending admin review', note: 'Store only provider tokens/IDs, never raw passwords' },
];

export const verificationQueue = [
  { name: 'ArcadeMusa', handle: '@arcademusa', request: 'Identity verification', status: 'Needs video call', risk: 'Medium' },
  { name: 'RankRush', handle: '@rankrush', request: 'YouTube + Discord link proof', status: 'Pending meeting', risk: 'Low' },
  { name: 'MemeArena', handle: '@memearena', request: 'Payout account review', status: 'Needs documents', risk: 'High' },
];

export const supportTickets = [
  { id: 'SUP-1031', title: 'Winner says payout is late', status: 'Open', priority: 'Urgent' },
  { id: 'SUP-1032', title: 'Cannot link YouTube account', status: 'Waiting on user', priority: 'Normal' },
  { id: 'SUP-1033', title: 'Challenge proof page shows wrong handle', status: 'Solved', priority: 'Low' },
];

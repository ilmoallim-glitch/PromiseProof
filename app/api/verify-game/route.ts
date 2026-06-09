import { NextResponse } from 'next/server';
import { recommendedMode } from '@/lib/verification';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const platform = String(body.platform ?? 'manual');
  const creatorUsername = String(body.creatorUsername ?? '');
  const challengerUsername = String(body.challengerUsername ?? '');

  // This is a safe stub. In production, connect each supported platform API here.
  // Example: Chess.com/Lichess game lookup, Riot match lookup, or Steam stats lookup.
  return NextResponse.json({
    ok: true,
    mode: recommendedMode(platform),
    status: 'pending_integration',
    message: 'Verification request received. Connect the platform API or judge workflow to complete this result.',
    input: { platform, creatorUsername, challengerUsername }
  });
}

import { NextResponse } from 'next/server';
import { calculatePromiseScore, type ScoreEvent } from '@/lib/scoring';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const events = Array.isArray(body.events) ? body.events as ScoreEvent[] : [];
  return NextResponse.json({ score: calculatePromiseScore(events), events });
}

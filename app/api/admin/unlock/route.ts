import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, getAdminGateToken } from '@/lib/adminGate';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));
  const expectedPassword = process.env.ADMIN_GATE_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json(
      { ok: false, message: 'ADMIN_GATE_PASSWORD is not set in environment variables.' },
      { status: 500 }
    );
  }

  if (!password || password !== expectedPassword) {
    return NextResponse.json({ ok: false, message: 'Wrong admin password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminGateToken(),
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}

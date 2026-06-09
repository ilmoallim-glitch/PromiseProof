import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'pp_admin_gate';
const ADMIN_TOKEN_LABEL = 'promiseproof-admin-gate-v1';

export function getAdminGateToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_GATE_PASSWORD || 'dev-only-change-me';
  return crypto.createHmac('sha256', secret).update(ADMIN_TOKEN_LABEL).digest('hex');
}

export function isAdminGateTokenValid(token?: string | null) {
  if (!token) return false;
  const expected = getAdminGateToken();
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

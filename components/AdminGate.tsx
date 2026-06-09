'use client';

import { FormEvent, useState } from 'react';

export function AdminGate() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || 'Could not unlock admin panel.');
      setLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="container admin-lock-wrap">
      <form className="glass form-panel admin-lock-card" onSubmit={unlock}>
        <div className="eyebrow"><span className="pulse-dot" /> Admin locked</div>
        <h2>Enter admin password</h2>
        <p className="muted">This uses a server-side environment variable and an HttpOnly cookie. For real production, still use Supabase admin/moderator roles too.</p>
        <label className="label">
          Password
          <input
            className="input"
            type="password"
            placeholder="Enter PromiseProof admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="error-box">{error}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Unlock admin panel'}
        </button>
      </form>
    </div>
  );
}

export function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <button className="btn btn-soft" type="button" onClick={logout} disabled={loading}>
      {loading ? 'Locking...' : 'Lock admin'}
    </button>
  );
}

import { cookies } from 'next/headers';
import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { AdminGate, AdminLogoutButton } from '@/components/AdminGate';
import { verificationQueue } from '@/lib/demo';
import { ADMIN_COOKIE_NAME, isAdminGateTokenValid } from '@/lib/adminGate';

export default function AdminPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const unlocked = isAdminGateTokenValid(token);

  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Admin control center</div>
            <h1>Control verification, disputes, users, and proof.</h1>
            <p className="hero-copy">Only unlocked admins can review verification requests, disputes, payout checks, and support escalations.</p>
          </div>
        </section>

        {!unlocked ? (
          <section className="section">
            <AdminGate />
          </section>
        ) : (
          <>
            <section className="section">
              <div className="container grid-2">
                <div className="glass form-panel">
                  <div className="admin-topline">
                    <div>
                      <h2>Admin panel unlocked</h2>
                      <p className="notice">This is the demo admin gate. The next serious step is connecting actions to Supabase roles, audit logs, and moderator permissions.</p>
                    </div>
                    <AdminLogoutButton />
                  </div>
                  <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="kpi"><strong>3</strong><span>verification requests</span></div>
                    <div className="kpi"><strong>1</strong><span>urgent dispute</span></div>
                    <div className="kpi"><strong>2</strong><span>payout reviews</span></div>
                    <div className="kpi"><strong>9</strong><span>open tickets</span></div>
                  </div>
                </div>
                <div className="feature-card table-card">
                  <h2>Verification queue</h2>
                  <table>
                    <thead><tr><th>User</th><th>Request</th><th>Status</th><th>Risk</th><th>Action</th></tr></thead>
                    <tbody>
                      {verificationQueue.map((row) => (
                        <tr key={row.handle}>
                          <td><strong>{row.name}</strong><br />{row.handle}</td>
                          <td>{row.request}</td>
                          <td>{row.status}</td>
                          <td>{row.risk}</td>
                          <td><ProofBadge label="Review" tone={row.risk === 'High' ? 'red' : row.risk === 'Medium' ? 'gold' : 'blue'} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="container grid-3">
                <div className="feature-card"><div className="feature-icon">✅</div><h3>Verify user</h3><p>Approve identity after Discord/Google Meet call, linked social check, and payout review.</p></div>
                <div className="feature-card"><div className="feature-icon">⚠️</div><h3>Handle disputes</h3><p>Mark a promise disputed, failed, refunded, or verified after evidence review.</p></div>
                <div className="feature-card"><div className="feature-icon">💬</div><h3>Open verification chat</h3><p>Create a secure message thread with meeting link, proof requests, and moderator notes.</p></div>
              </div>
            </section>
          </>
        )}
      </main>
    </Shell>
  );
}

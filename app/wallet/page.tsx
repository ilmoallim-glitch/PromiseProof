import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ThemedSelect } from '@/components/ThemedSelect';
import { payoutAccounts } from '@/lib/demo';

export default function WalletPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Wallet & payouts</div>
            <h1>Users save payout accounts safely.</h1>
            <p className="hero-copy">Winners should add a payout destination before receiving money. Creators should fund prizes before challenges go live. Use Stripe Connect/Express or PayPal payouts later.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>Add payout method</h2>
              <div className="form-grid">
                <ThemedSelect label="Provider" options={[{ label: 'PayPal', value: 'paypal' }, { label: 'Stripe Express', value: 'stripe' }, { label: 'Manual admin payout', value: 'manual' }]} />
                <label className="label">Payout email or provider ID<input className="input" placeholder="name@example.com or acct_xxx" /></label>
                <ThemedSelect label="Country" options={[{ label: 'United States', value: 'us' }, { label: 'United Kingdom', value: 'uk' }, { label: 'Kenya', value: 'ke' }, { label: 'Somalia', value: 'so' }, { label: 'Other', value: 'other' }]} />
                <button className="btn btn-primary" type="button">Save payout account</button>
                <p className="notice">Do not collect payment passwords. The backend should store provider customer/account IDs and encrypted metadata only.</p>
              </div>
            </div>
            <div className="feature-card">
              <h2>Saved payout accounts</h2>
              {payoutAccounts.map((account) => (
                <div className="account-box" key={account.provider}>
                  <span className="status-dot green" />
                  <div><b>{account.provider} · {account.label}</b><p>{account.note}</p></div>
                  <ProofBadge label={account.status} tone={account.status.includes('Ready') ? 'green' : 'gold'} />
                </div>
              ))}
              <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className="kpi"><strong>$318</strong><span>paid out</span></div>
                <div className="kpi"><strong>$25</strong><span>funded balance</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ThemedSelect } from '@/components/ThemedSelect';
import { socialAccounts } from '@/lib/demo';

export default function SocialsPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Connected accounts</div>
            <h1>Social accounts prove who the creator is.</h1>
            <p className="hero-copy">Users can add YouTube, TikTok, Instagram, X, Twitch, Discord, and other profiles. OAuth verification is best. Manual links stay unverified until admin review.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>Add social account</h2>
              <div className="form-grid">
                <ThemedSelect label="Platform" options={[{ label: 'YouTube', value: 'youtube' }, { label: 'TikTok', value: 'tiktok' }, { label: 'Instagram', value: 'instagram' }, { label: 'X / Twitter', value: 'x' }, { label: 'Discord', value: 'discord' }, { label: 'Twitch', value: 'twitch' }]} />
                <label className="label">Profile URL or handle<input className="input" placeholder="https://youtube.com/@yourchannel" /></label>
                <label className="label">Verification note<textarea className="textarea" placeholder="Explain how the admin can confirm this account is yours." /></label>
                <button className="btn btn-primary" type="button">Submit account for review</button>
              </div>
            </div>
            <div className="feature-card">
              <h2>Current accounts</h2>
              {socialAccounts.map((account) => (
                <div className="account-box" key={account.platform}>
                  <span className="avatar">{account.icon}</span>
                  <div><b>{account.platform} · {account.handle}</b><p>{account.verification}</p></div>
                  <ProofBadge label={account.status} tone={account.status === 'Connected' ? 'green' : account.status === 'Pending' ? 'gold' : 'red'} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

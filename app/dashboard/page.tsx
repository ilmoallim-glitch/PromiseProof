import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';
import { ThemedSelect } from '@/components/ThemedSelect';

export default function DashboardPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Creator dashboard demo</div>
            <h1>Create a promise people can verify.</h1>
            <p className="hero-copy">The dashboard now assumes account-first usage: sign in, link socials, add payout account, then create a funded and locked challenge.</p>
            <div className="btn-row">
              <Link href="/auth" className="btn btn-ghost">Sign in first</Link>
              <Link href="/onboarding" className="btn btn-primary">Complete onboarding</Link>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>New challenge</h2>
              <div className="form-grid">
                <label className="label">Challenge title<input className="input" placeholder="Leaderboard Crown Rush: hold #1 by Friday" /></label>
                <ThemedSelect label="Reward type" options={[{ label: 'Money payout', value: 'money' }, { label: 'Digital reward', value: 'digital' }, { label: 'Private Discord invite', value: 'discord' }, { label: 'Creator shoutout', value: 'shoutout' }]} />
                <label className="label">Reward amount<input className="input" placeholder="$5 or Discord invite" /></label>
                <ThemedSelect label="Verification method" options={[{ label: 'API verified result', value: 'api' }, { label: 'Hidden code / hash match', value: 'code' }, { label: 'Controlled match room', value: 'room' }, { label: 'Moderator verified', value: 'judge' }, { label: 'Manual proof', value: 'manual' }]} />
                <label className="label">Proof source<input className="input" placeholder="Game API, leaderboard URL, stream URL, or lobby code" /></label>
                <label className="label">Rules<textarea className="textarea" placeholder="Explain exactly how someone wins, when entries close, and how proof is checked." /></label>
                <button className="btn btn-primary" type="button">Lock rules and fund reward</button>
              </div>
            </div>
            <div className="feature-card">
              <h2>Before publishing</h2>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">1</span><b>Account</b><span>email login required</span></div>
                <div className="progress-row"><span className="tick">2</span><b>Social links</b><span>connect channels</span></div>
                <div className="progress-row"><span className="tick">3</span><b>Fund</b><span>deposit prize first</span></div>
                <div className="progress-row"><span className="tick">4</span><b>Lock</b><span>freeze rules</span></div>
                <div className="progress-row"><span className="tick">5</span><b>Verify</b><span>winner or result</span></div>
              </div>
              <p className="notice" style={{ marginTop: 18 }}>Do not require YouTube likes/subscribers as entry. Keep social actions optional and use PromiseProof for entries, rewards, and proof.</p>
              <div className="account-box" style={{ marginTop: 18 }}>
                <span className="status-dot" />
                <div><b>Identity verification</b><p>Unverified until human admin approves you after Discord/Google Meet.</p></div>
                <ProofBadge label="Unverified" tone="gold" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

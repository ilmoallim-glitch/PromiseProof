import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';

export default function AuthPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container auth-card">
            <div className="eyebrow"><span className="pulse-dot" /> Account required</div>
            <h1>Create an account before joining challenges.</h1>
            <p className="hero-copy">Every user should have a real account first. They can sign in with Google or email, then link social accounts and payout accounts from onboarding.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>Sign in / register</h2>
              <p className="lead">This is the frontend shell. Connect these buttons to Supabase Auth providers.</p>
              <div className="form-grid">
                <button className="btn btn-primary" type="button">Continue with Google</button>
                <label className="label">Email<input className="input" placeholder="you@example.com" /></label>
                <label className="label">Password<input className="input" type="password" placeholder="Minimum 8 characters" /></label>
                <button className="btn btn-ghost" type="button">Create account with email</button>
                <p className="notice note-blue">After signup, send the user to onboarding so they link YouTube/socials and add payout details.</p>
              </div>
            </div>
            <div className="feature-card">
              <h2>Account safety rules</h2>
              <div className="progress-list">
                <div className="progress-row"><span className="tick">1</span><b>Email required</b><span>no anonymous winners</span></div>
                <div className="progress-row"><span className="tick">2</span><b>Social links</b><span>YouTube/TikTok/etc.</span></div>
                <div className="progress-row"><span className="tick">3</span><b>Payout method</b><span>PayPal or Stripe</span></div>
                <div className="progress-row"><span className="tick">4</span><b>Human verification</b><span>admin approves identity</span></div>
              </div>
              <div style={{ marginTop: 18 }}>
                <ProofBadge label="Default status: unverified" tone="gold" />
              </div>
              <div style={{ marginTop: 18 }} className="btn-row">
                <Link className="btn btn-primary" href="/onboarding">Go to onboarding</Link>
                <Link className="btn btn-ghost" href="/support">Need help?</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

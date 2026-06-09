import { Shell } from '@/components/Shell';
import { ProofBadge } from '@/components/ProofBadge';

export default function MessagesPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Trust inbox</div>
            <h1>Messaging built for verification.</h1>
            <p className="hero-copy">Users can contact each other, and admins/moderators can open verification chats, request proof, send meeting links, and keep the proof trail in one place.</p>
          </div>
        </section>
        <section className="section">
          <div className="container message-shell">
            <div className="thread-list">
              <div className="thread-item active"><span className="avatar">🛡️</span><div><b>Admin Verification</b><p>Google Meet link ready</p></div></div>
              <div className="thread-item"><span className="avatar">🎮</span><div><b>ProofKing</b><p>Can you verify the match screenshot?</p></div></div>
              <div className="thread-item"><span className="avatar">💸</span><div><b>Payout Support</b><p>PayPal review pending</p></div></div>
              <div className="thread-item"><span className="avatar">⚠️</span><div><b>Dispute Room</b><p>Challenge PP-1028</p></div></div>
            </div>
            <div className="chat-panel">
              <div className="chat-head">
                <div className="creator-meta"><span className="avatar">🛡️</span><div><h3>Admin Verification</h3><p>Identity check · video call required</p></div></div>
                <ProofBadge label="Secure thread" tone="green" />
              </div>
              <div className="chat-body">
                <div className="bubble">Hi ArcadeMusa, before we verify your badge, please join the Discord verification room or use this Google Meet link.</div>
                <div className="bubble me">I can join today. Should I show my YouTube channel dashboard?</div>
                <div className="bubble">Yes. Please show your channel while logged in, then confirm your PromiseProof handle on camera. We will not record private payment details.</div>
                <div className="bubble me">Done. I also linked PayPal and Discord.</div>
                <div className="bubble">Great. After the call, a moderator will mark identity as verified or request more proof.</div>
              </div>
              <div className="composer">
                <input className="input" placeholder="Write a message, attach proof, or paste meeting link..." />
                <button className="btn btn-primary" type="button">Send</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

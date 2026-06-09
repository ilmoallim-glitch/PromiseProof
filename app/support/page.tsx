import { Shell } from '@/components/Shell';
import { ThemedSelect } from '@/components/ThemedSelect';
import { supportTickets } from '@/lib/demo';

export default function SupportPage() {
  return (
    <Shell>
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow"><span className="pulse-dot" /> Contact support</div>
            <h1>A modern support system for disputes and payouts.</h1>
            <p className="hero-copy">Support is not just a basic contact form. It should handle tickets, attachments, dispute evidence, payout issues, account linking, and admin replies.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            <div className="glass form-panel">
              <h2>Create support ticket</h2>
              <div className="form-grid">
                <ThemedSelect label="Issue type" options={[{ label: 'Payout problem', value: 'payout' }, { label: 'Challenge dispute', value: 'dispute' }, { label: 'Account/social linking', value: 'account' }, { label: 'Identity verification', value: 'verification' }, { label: 'Bug report', value: 'bug' }]} />
                <label className="label">Subject<input className="input" placeholder="Winner says payout is missing" /></label>
                <label className="label">Challenge link or ID<input className="input" placeholder="PP-1028 or proof page URL" /></label>
                <label className="label">Message<textarea className="textarea" placeholder="Explain what happened and attach screenshots in the real app." /></label>
                <button className="btn btn-primary" type="button">Submit ticket</button>
              </div>
            </div>
            <div className="feature-card table-card">
              <h2>Ticket dashboard</h2>
              <table>
                <thead><tr><th>Ticket</th><th>Subject</th><th>Status</th><th>Priority</th></tr></thead>
                <tbody>
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id}><td><strong>{ticket.id}</strong></td><td>{ticket.title}</td><td>{ticket.status}</td><td>{ticket.priority}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="notice note-blue" style={{ marginTop: 18 }}>Later: add email notifications, file attachments, internal notes, SLA labels, and user-visible ticket status.</p>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

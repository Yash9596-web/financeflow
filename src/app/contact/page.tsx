import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | FinanceFlow',
  description: 'Get in touch with the FinanceFlow team for support, feedback, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>Contact Us</span>
        </nav>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>Have a question, feedback, or found a bug in our calculators? We&apos;d love to hear from you.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" className="input-field" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" className="input-field" placeholder="john@example.com" required />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <select className="select-field" required>
                  <option value="">Select a topic</option>
                  <option value="feedback">Feedback / Suggestion</option>
                  <option value="bug">Report a Bug</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Message</label>
                <textarea className="input-field" rows={5} placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Send Message</button>
            </form>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
             <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
               <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Email Support</h3>
               <p style={{ color: 'var(--text-muted)' }}>support@financeflow.in</p>
             </div>
             <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
               <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏢</div>
               <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Business</h3>
               <p style={{ color: 'var(--text-muted)' }}>partners@financeflow.in</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

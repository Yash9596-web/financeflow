import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FinanceFlow',
  description: 'Privacy Policy for FinanceFlow. Learn how we protect your personal information and financial data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>Privacy Policy</span>
        </nav>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h2>
          <p style={{ marginBottom: '1rem' }}>Welcome to FinanceFlow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Data We Collect</h2>
          <p style={{ marginBottom: '1rem' }}>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> includes information about how you use our website, calculators, and tools.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Contact Data:</strong> includes email address if you subscribe to our newsletter or contact us via our forms.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
          <p style={{ marginBottom: '1rem' }}>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>To provide and maintain our Service.</li>
            <li style={{ marginBottom: '0.5rem' }}>To notify you about changes to our Service.</li>
            <li style={{ marginBottom: '0.5rem' }}>To allow you to participate in interactive features of our Service when you choose to do so.</li>
            <li style={{ marginBottom: '0.5rem' }}>To provide customer support.</li>
            <li style={{ marginBottom: '0.5rem' }}>To gather analysis or valuable information so that we can improve our Service.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Financial Data Privacy</h2>
          <p style={{ marginBottom: '1rem' }}><strong>Important:</strong> All calculations performed on FinanceFlow are processed locally in your browser. We do not store, save, or transmit the financial numbers, salaries, or loan amounts you input into our calculators.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>5. Third-Party Services & Advertising</h2>
          <p style={{ marginBottom: '1rem' }}>We use third-party services like Google Analytics and Google AdSense. These services may use cookies to serve ads based on your prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>6. Contact Us</h2>
          <p style={{ marginBottom: '1rem' }}>If you have any questions about this Privacy Policy, please contact us at privacy@financeflow.in.</p>
        </div>
      </div>
    </div>
  );
}

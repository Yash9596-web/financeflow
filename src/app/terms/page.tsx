import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | FinanceFlow',
  description: 'Terms and Conditions for using FinanceFlow calculators and services.',
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>Terms & Conditions</span>
        </nav>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: '1rem' }}>By accessing and using FinanceFlow (&quot;the Website&quot;), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Website.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Use License</h2>
          <p style={{ marginBottom: '1rem' }}>Permission is granted to temporarily use the materials and calculators on FinanceFlow for personal, non-commercial transitory viewing only.</p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Accuracy of Calculations</h2>
          <p style={{ marginBottom: '1rem' }}>The calculators and tools provided on FinanceFlow are for informational and educational purposes only. While we strive for accuracy, we make no guarantees regarding the exactness of the results. The actual figures provided by your bank or financial institution may vary based on specific conditions, fees, and processing methods.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Financial Advice Disclaimer</h2>
          <p style={{ marginBottom: '1rem' }}>FinanceFlow is not a registered financial advisor, broker, or tax professional. The content and tools on this website do not constitute financial, investment, or tax advice. You should consult with a certified professional before making any financial decisions.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>5. Limitations</h2>
          <p style={{ marginBottom: '1rem' }}>In no event shall FinanceFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on FinanceFlow.</p>
        </div>
      </div>
    </div>
  );
}

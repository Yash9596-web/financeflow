import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedCalculators } from '@/data/calculators';

export const metadata: Metadata = {
  title: 'About Us | FinanceFlow',
  description: 'Learn about FinanceFlow, our mission to simplify financial planning, and our commitment to providing accurate, free tools.',
};

export default function AboutPage() {
  const popular = getFeaturedCalculators().slice(0, 3);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>About Us</span>
        </nav>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>About FinanceFlow</h1>
        
        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '2rem', fontWeight: 500 }}>
            Our mission is to simplify personal finance by providing everyone with access to premium, accurate, and free financial calculation tools.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Who We Are</h2>
          <p style={{ marginBottom: '1rem' }}>FinanceFlow was built out of frustration with complex, cluttered, and inaccurate financial calculators online. We noticed that planning for loans, investments, and taxes was harder than it needed to be.</p>
          <p style={{ marginBottom: '1rem' }}>We set out to build a platform that combines bank-grade mathematical accuracy with a beautiful, user-friendly interface. Whether you are planning to buy your first home, calculating your tax liability, or planning for retirement, FinanceFlow is designed to give you instant clarity.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Our Core Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Accuracy</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>We use industry-standard formulas to ensure reliable results.</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Privacy</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Your data stays on your device. We don&apos;t store your financial inputs.</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🆓</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Free Forever</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No paywalls, no hidden fees. Just free tools for everyone.</p>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Try Our Popular Tools</h2>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
            {popular.map(c => (
              <li key={c.slug} style={{ marginBottom: '0.5rem' }}>
                <Link href={`/calculators/${c.slug}`} style={{ color: 'var(--primary)', fontWeight: 500 }}>{c.title}</Link> - {c.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

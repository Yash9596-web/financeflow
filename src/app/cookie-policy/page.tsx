import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | FinanceFlow',
  description: 'Cookie Policy for FinanceFlow. Learn how we use cookies to improve your experience.',
};

export default function CookiePolicyPage() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>Cookie Policy</span>
        </nav>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Cookie Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div style={{ lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. What Are Cookies</h2>
          <p style={{ marginBottom: '1rem' }}>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Cookies</h2>
          <p style={{ marginBottom: '1rem' }}>FinanceFlow uses cookies for several purposes:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Essential Cookies:</strong> Required to enable core website functionality such as theme preference (dark/light mode).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our website, helping us improve our tools.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Advertising Cookies:</strong> We use Google AdSense, which uses cookies to serve ads based on your prior visits to our site or other sites on the internet.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Managing Cookies</h2>
          <p style={{ marginBottom: '1rem' }}>You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.</p>
          <p style={{ marginBottom: '1rem' }}>Most browsers allow you to view, manage, delete and block cookies for a website. Be aware that if you delete all cookies, any preferences you have set will be lost.</p>

          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Google AdSense specific</h2>
          <p style={{ marginBottom: '1rem' }}>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Ads Settings</a>.</p>
        </div>
      </div>
    </div>
  );
}

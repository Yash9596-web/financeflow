import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AIAdvisorClient = dynamic(() => import('./AIAdvisorClient'), {
  loading: () => (
    <div style={{
      height: '720px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      marginTop: '1rem',
      boxShadow: 'var(--shadow-xl)',
    }}>
      <div 
        className="skeleton" 
        style={{ 
          width: '70px', 
          height: '70px', 
          borderRadius: '50%',
          background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--border-color) 50%, var(--bg-secondary) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }}
      />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, margin: 0 }}>
        Loading AI Financial Advisory Console...
      </p>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
});

export const metadata: Metadata = {
  title: 'AI Finance Advisor | FinanceFlow',
  description: 'Get personalized financial insights, budget planning, and investment strategies with FinanceFlow AI.',
};

export default function AIAdvisorPage() {
  return (
    <div className="section">
      <div className="container">
        <nav className="breadcrumb" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link> <span style={{ margin: '0 0.5rem' }}>›</span> <span>AI Advisor</span>
        </nav>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ background: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
            New Feature
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>AI Finance Advisor</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Chat with our intelligent financial assistant to optimize your budget, plan for retirement, and explore investment strategies tailored to you.
          </p>
        </div>

        <AIAdvisorClient />

        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>📊 Budget Optimization</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Upload your expenses and let AI suggest areas to cut back and save more money.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>📈 Investment Planning</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Get personalized mutual fund and stock market allocation strategies based on your risk profile.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>🏠 Tax Assistant</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Find hidden tax deductions under Section 80C, HRA, and home loans instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

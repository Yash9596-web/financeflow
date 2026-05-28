import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px' }}>
        The page you are looking for doesn&apos;t exist or has been moved. 
        Let&apos;s get you back to calculating your finances.
      </p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}

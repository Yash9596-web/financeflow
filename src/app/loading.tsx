export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '2rem' }}>
      <div className="spinner" style={{ 
        width: '40px', 
        height: '40px', 
        border: '4px solid var(--border-color)', 
        borderTopColor: 'var(--primary)', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Loading FinanceFlow...</p>
    </div>
  );
}

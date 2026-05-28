import Link from 'next/link';

interface Offer {
  id: string;
  provider: string;
  title: string;
  description: string;
  rate?: string;
  badge?: string;
  link: string;
  logoUrl?: string;
}

interface Props {
  type: 'loan' | 'credit-card' | 'investment';
  offers: Offer[];
}

export default function AffiliateWidget({ type, offers }: Props) {
  if (!offers || offers.length === 0) return null;

  return (
    <div style={{ margin: '2rem 0', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            {type === 'loan' ? 'Top Loan Offers for You' : type === 'credit-card' ? 'Best Credit Cards' : 'Recommended Investment Platforms'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Based on your calculation, you might be eligible for these sponsored offers.</p>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Sponsored</span>
      </div>

      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {offers.map((offer) => (
            <div key={offer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {offer.provider.substring(0, 1)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{offer.provider}</h4>
                    {offer.badge && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(22, 163, 74, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '20px', fontWeight: 500 }}>{offer.badge}</span>}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{offer.title}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{offer.description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {offer.rate && (
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting From</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{offer.rate}%</p>
                  </div>
                )}
                <Link href={offer.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

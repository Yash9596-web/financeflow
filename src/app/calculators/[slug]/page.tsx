import { getCalculatorBySlug, calculators } from '@/data/calculators';
import CalculatorLayout from '@/components/CalculatorLayout';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const runtime = 'edge';

export function generateStaticParams() {
  // Only generate params for calculators that don't have their own dedicated folder.
  // Next.js will automatically route dedicated folders first.
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const calc = getCalculatorBySlug(resolvedParams.slug);
  if (!calc) return {};
  
  return {
    title: `${calc.title} | FinanceFlow`,
    description: calc.metaDescription,
  };
}

export default async function GenericCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const calc = getCalculatorBySlug(resolvedParams.slug);
  
  if (!calc) {
    notFound();
  }

  return (
    <CalculatorLayout 
      slug={calc.slug}
      title={calc.title}
      description={calc.description}
      icon={calc.icon}
    >
      <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-color)' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{calc.icon}</span>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{calc.title} Engine Updating</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
          We are currently upgrading the mathematical models for this calculator to ensure maximum accuracy for the new financial year.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600 }}>
          <span className="spinner" style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #3b82f6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
          Check back soon
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </CalculatorLayout>
  );
}

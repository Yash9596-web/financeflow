import Link from 'next/link';
import Script from 'next/script';
import FAQ from './FAQ';
import RecentCalculatorsTracker from './RecentCalculatorsTracker';
import SocialShare from './SocialShare';
import { getRelatedCalculators } from '@/data/calculators';
import styles from './CalculatorLayout.module.css';
import type { ReactNode } from 'react';

interface Props {
  slug: string;
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
  formulaSection?: ReactNode;
  faqItems?: { question: string; answer: string }[];
}

export default function CalculatorLayout({ slug, title, description, icon, children, formulaSection, faqItems }: Props) {
  const related = getRelatedCalculators(slug);
  const baseUrl = 'https://financeflow.in';
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
      { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': `${baseUrl}/calculators` },
      { '@type': 'ListItem', 'position': 3, 'name': title, 'item': `${baseUrl}/calculators/${slug}` }
    ]
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': title,
    'description': description,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All'
  };

  const faqSchema = faqItems && faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  } : null;

  return (
    <div className={styles.page}>
      <Script id={`schema-breadcrumb-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id={`schema-software-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {faqSchema && <Script id={`schema-faq-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className="container">
          <Link href="/">Home</Link>
          <span className={styles.breadSep}>›</span>
          <Link href="/calculators">Calculators</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>{title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroIcon}>{icon}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroDesc}>{description}</p>
        </div>
      </section>

      {/* Calculator */}
      <section className={styles.calcSection}>
        <div className="container">
          {children}
        </div>
      </section>

      {/* Ad Slot */}
      <div className="container">
        <div className="ad-slot ad-slot-banner">Advertisement</div>
      </div>

      {/* Social Share */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '2rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Share this Calculator</h3>
          <SocialShare url={`${baseUrl}/calculators/${slug}`} title={title} />
        </div>
      </section>

      {/* Formula */}
      {formulaSection && (
        <section className={`section ${styles.formulaSection}`}>
          <div className="container">{formulaSection}</div>
        </section>
      )}

      {/* FAQ */}
      {faqItems && faqItems.length > 0 && (
        <section className="section">
          <div className="container">
            <FAQ items={faqItems} title={`${title} — FAQs`} />
          </div>
        </section>
      )}

      {/* Related Calculators */}
      <section className={`section ${styles.relatedSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🧮 More Tools</span>
            <h2>Related Calculators</h2>
            <p>Explore more financial tools to help you plan better.</p>
          </div>
          <div className={styles.relatedGrid}>
            {related.map(c => (
              <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.relatedCard}>
                <span className={styles.relatedIcon}>{c.icon}</span>
                <h3>{c.shortTitle}</h3>
                <p>{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent History */}
      <RecentCalculatorsTracker currentSlug={slug} />

      {/* Bottom Ad */}
      <div className="container">
        <div className="ad-slot ad-slot-banner">Advertisement</div>
      </div>
    </div>
  );
}

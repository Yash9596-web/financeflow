import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators, calculatorCategories } from '@/data/calculators';
import styles from './calculators-listing.module.css';

export const metadata: Metadata = {
  title: 'All Financial Calculators — Free Online Finance Tools',
  description: 'Browse 20+ free financial calculators — EMI, SIP, FD, RD, PPF, GST, Income Tax, Salary, Retirement and more. Accurate, instant, and mobile-friendly.',
};

export default function CalculatorsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-badge">🧮 Calculators</span>
          <h1 className={styles.heroTitle}>All Financial <span className="text-gradient">Calculators</span></h1>
          <p className={styles.heroDesc}>Browse our complete suite of 20+ free financial calculators. Accurate, instant, and mobile-friendly.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {calculatorCategories.map(cat => {
            const catCalcs = calculators.filter(c => c.category === cat);
            return (
              <div key={cat} className={styles.categoryBlock}>
                <h2 className={styles.categoryTitle}>{cat}</h2>
                <div className={styles.grid}>
                  {catCalcs.map(c => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.card}>
                      <span className={styles.cardIcon}>{c.icon}</span>
                      <div>
                        <h3 className={styles.cardTitle}>{c.title}</h3>
                        <p className={styles.cardDesc}>{c.description}</p>
                      </div>
                      <span className={styles.cardArrow}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="container"><div className="ad-slot ad-slot-banner">Advertisement</div></div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculatorCategories } from '@/data/calculators';
import type { CalculatorMeta } from '@/data/calculators';
import styles from './page.module.css';

export default function HomepageClient({ calculators }: { calculators: CalculatorMeta[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? calculators
    : calculators.filter(c => c.category === activeCategory);

  return (
    <>
      <div className={styles.categoryFilter}>
        <button className={`${styles.filterBtn} ${activeCategory === 'All' ? styles.filterActive : ''}`} onClick={() => setActiveCategory('All')}>All</button>
        {calculatorCategories.map(cat => (
          <button key={cat} className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>
      <div className={styles.allCalcsGrid}>
        {filtered.map(c => (
          <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.allCalcCard}>
            <span className={styles.allCalcIcon}>{c.icon}</span>
            <div>
              <h3 className={styles.allCalcTitle}>{c.shortTitle}</h3>
              <p className={styles.allCalcDesc}>{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

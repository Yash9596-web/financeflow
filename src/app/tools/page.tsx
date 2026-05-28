import type { Metadata } from 'next';
import Link from 'next/link';
import { calculators, calculatorCategories } from '@/data/calculators';
import styles from './tools.module.css';

export const metadata: Metadata = {
  title: 'Finance Tools — Free Online Financial Calculators & Utilities | FinanceFlow',
  description: 'Explore 20+ free financial tools — EMI, SIP, FD, Currency Converter, Tax Calculator, Retirement Planner and more. All tools are accurate, instant, and free forever.',
};

const toolHighlights = [
  {
    title: 'Calculators',
    desc: '20+ financial calculators for loans, investments, taxes, and savings.',
    icon: '🧮',
    color: '#3b82f6',
    href: '/calculators',
  },
  {
    title: 'Currency Converter',
    desc: 'Live exchange rates for 35+ currencies, auto-refreshed every 60 seconds.',
    icon: '💱',
    color: '#16a34a',
    href: '/calculators/currency-converter',
  },
  {
    title: 'AI Advisor',
    desc: 'Get personalized financial advice powered by artificial intelligence.',
    icon: '🤖',
    color: '#8b5cf6',
    href: '/ai-advisor',
  },
  {
    title: 'Tax Planner',
    desc: 'Compare old vs new tax regime and find the best strategy for you.',
    icon: '📋',
    color: '#f59e0b',
    href: '/calculators/income-tax-calculator',
  },
];

export default function ToolsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-badge">🛠️ Finance Tools</span>
          <h1 className={styles.heroTitle}>
            All Financial <span className="text-gradient">Tools</span>
          </h1>
          <p className={styles.heroDesc}>
            Everything you need to make smarter financial decisions — calculators, converters, planners, and more. All free, all instant.
          </p>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="section">
        <div className="container">
          <div className={styles.highlightGrid}>
            {toolHighlights.map((tool) => (
              <Link key={tool.title} href={tool.href} className={styles.highlightCard}>
                <div className={styles.highlightIconWrap} style={{ background: `${tool.color}15`, borderColor: `${tool.color}30` }}>
                  <span className={styles.highlightIcon}>{tool.icon}</span>
                </div>
                <h3 className={styles.highlightTitle}>{tool.title}</h3>
                <p className={styles.highlightDesc}>{tool.desc}</p>
                <span className={styles.highlightCta} style={{ color: tool.color }}>
                  Open Tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools by Category */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📂 Browse by Category</span>
            <h2>All Tools & Calculators</h2>
            <p>Find the right tool for your financial needs.</p>
          </div>

          {calculatorCategories.map((cat) => {
            const catCalcs = calculators.filter((c) => c.category === cat);
            return (
              <div key={cat} className={styles.categoryBlock}>
                <h3 className={styles.categoryTitle}>{cat}</h3>
                <div className={styles.toolGrid}>
                  {catCalcs.map((c) => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.toolCard}>
                      <span className={styles.toolIcon}>{c.icon}</span>
                      <div className={styles.toolInfo}>
                        <h4 className={styles.toolName}>{c.title}</h4>
                        <p className={styles.toolDesc}>{c.description}</p>
                      </div>
                      <span className={styles.toolArrow}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Can&apos;t find what you need?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            We&apos;re constantly adding new tools. Let us know what calculators or features you&apos;d like to see.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Request a Tool
          </Link>
        </div>
      </section>

      <div className="container"><div className="ad-slot ad-slot-banner">Advertisement</div></div>
    </div>
  );
}

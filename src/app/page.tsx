import Link from 'next/link';
import { calculators, getFeaturedCalculators } from '@/data/calculators';
import { getFeaturedPosts } from '@/data/blogPosts';
import HomepageClient from './HomepageClient';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';

export default function Home() {
  const featured = getFeaturedCalculators();
  const featuredPosts = getFeaturedPosts();
  const allCalcs = calculators;

  return (
    <>
      {/* HERO SECTION */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
          <div className={styles.heroOrb3}></div>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span>🚀</span> India&apos;s #1 Free Finance Calculator Platform
          </div>
          <h1 className={styles.heroTitle}>
            Smart Financial Calculators for{' '}
            <span className="text-gradient">Better Decisions</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Calculate loans, investments, taxes, retirement plans, and financial growth instantly with advanced finance tools trusted by millions.
          </p>
          <div className={styles.heroCTA}>
            <Link href="/calculators" className="btn btn-primary btn-lg" id="hero-explore-btn">
              Explore Calculators
            </Link>
            <Link href="/tools" className="btn btn-secondary btn-lg" id="hero-tools-btn">
              View Tools
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>20+</span>
              <span className={styles.heroStatLabel}>Calculators</span>
            </div>
            <div className={styles.heroStatDivider}></div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>100%</span>
              <span className={styles.heroStatLabel}>Free Forever</span>
            </div>
            <div className={styles.heroStatDivider}></div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>🔒</span>
              <span className={styles.heroStatLabel}>Secure & Private</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CALCULATOR CARDS */}
      <section className={`section ${styles.quickCalcs}`} id="quick-calculators">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">⚡ Quick Access</span>
            <h2>Popular Financial Calculators</h2>
            <p>Choose from our most-used calculators to get instant financial insights.</p>
          </div>
          <div className={styles.calcGrid}>
            {featured.map((c, i) => (
              <Link key={c.slug} href={`/calculators/${c.slug}`} className={`${styles.calcCard} stagger-${i + 1}`} id={`calc-card-${c.slug}`}>
                <span className={styles.calcIcon}>{c.icon}</span>
                <h3 className={styles.calcCardTitle}>{c.shortTitle} Calculator</h3>
                <p className={styles.calcCardDesc}>{c.description}</p>
                <span className={styles.calcCardCTA}>Calculate Now →</span>
              </Link>
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href="/calculators" className="btn btn-secondary" id="view-all-calcs-btn">View All 20+ Calculators</Link>
          </div>
        </div>
      </section>

      {/* FINANCE INSIGHTS */}
      <section className={`section ${styles.insights}`} id="finance-insights">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📊 Insights</span>
            <h2>Finance Insights Dashboard</h2>
            <p>Key financial metrics and tips to help you make informed decisions.</p>
          </div>
          <div className={styles.insightsGrid}>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>📈</div>
              <h3>Investment Growth</h3>
              <p className={styles.insightValue}>12.5% avg.</p>
              <p className={styles.insightLabel}>Nifty 50 historical returns (10Y)</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>💰</div>
              <h3>Savings Target</h3>
              <p className={styles.insightValue}>₹1 Cr</p>
              <p className={styles.insightLabel}>SIP of ₹10K/mo for 20 years at 12%</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>🏠</div>
              <h3>Home Loan Rate</h3>
              <p className={styles.insightValue}>8.5% p.a.</p>
              <p className={styles.insightLabel}>Average home loan interest rate</p>
            </div>
            <div className={styles.insightCard}>
              <div className={styles.insightIcon}>📉</div>
              <h3>Inflation Rate</h3>
              <p className={styles.insightValue}>5.1%</p>
              <p className={styles.insightLabel}>Current CPI inflation rate in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* AD SLOT */}
      <div className="container">
        <div className="ad-slot ad-slot-banner">Advertisement</div>
      </div>

      {/* WHY CHOOSE FINANCEFLOW */}
      <section className={`section ${styles.whySection}`} id="why-financeflow">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">✨ Why Us</span>
            <h2>Why Choose FinanceFlow?</h2>
            <p>Trusted by thousands of users for accurate and reliable financial calculations.</p>
          </div>
          <div className={styles.whyGrid}>
            {[
              { icon: '🎯', title: 'Accurate Calculations', desc: 'Bank-grade formulas with transparent methodology for every calculation.' },
              { icon: '⚡', title: 'Blazing Fast', desc: 'Instant results with real-time updates as you adjust parameters.' },
              { icon: '🔒', title: 'Privacy First', desc: 'All calculations happen in your browser. We never store your financial data.' },
              { icon: '📱', title: 'Mobile Optimized', desc: 'Beautiful experience on any device — phone, tablet, or desktop.' },
              { icon: '🆓', title: '100% Free', desc: 'All tools are completely free. No hidden charges, no premium locks.' },
              { icon: '📊', title: 'Visual Reports', desc: 'Interactive charts and detailed breakdowns for every calculation.' },
            ].map((f, i) => (
              <div key={i} className={styles.whyCard}>
                <span className={styles.whyIcon}>{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CALCULATORS */}
      <section className={`section ${styles.allCalcsSection}`} id="all-calculators">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">🧮 All Tools</span>
            <h2>Complete Calculator Suite</h2>
            <p>Everything you need to manage your finances in one place.</p>
          </div>
          <HomepageClient calculators={allCalcs} />
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className={`section ${styles.blogSection}`} id="blog-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">📝 Latest Articles</span>
            <h2>Finance Blog</h2>
            <p>Expert insights, guides, and tips to boost your financial knowledge.</p>
          </div>
          <div className={styles.blogGrid}>
            {featuredPosts.slice(0, 4).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.blogCard} id={`blog-${post.slug}`}>
                <div className={styles.blogCardTop}>
                  <span className={styles.blogCategory}>{post.category}</span>
                  <span className={styles.blogTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                <div className={styles.blogCardFooter}>
                  <span className={styles.blogAuthor}>{post.author}</span>
                  <span className={styles.blogReadMore}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.viewAllWrap}>
            <Link href="/blog" className="btn btn-secondary" id="view-all-blog-btn">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`section ${styles.homeFAQ}`} id="home-faq">
        <div className="container">
          <HomepageFAQ />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className={`section ${styles.newsletter}`} id="newsletter">
        <div className="container">
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <span className="section-badge">📬 Newsletter</span>
              <h2>Get Smart Financial Tips Weekly</h2>
              <p>Join thousands of readers receiving expert finance tips, market insights, and exclusive calculator updates.</p>
            </div>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email address" className="input-field" id="newsletter-email" required />
              <button type="button" className="btn btn-primary" id="newsletter-submit">Subscribe Free</button>
            </form>
            <p className={styles.newsletterTrust}>🔒 No spam. Unsubscribe anytime. Your privacy matters.</p>
          </div>
        </div>
      </section>

      {/* BOTTOM AD */}
      <div className="container">
        <div className="ad-slot ad-slot-banner">Advertisement</div>
      </div>
    </>
  );
}

function HomepageFAQ() {
  const items = [
    { question: 'What is FinanceFlow?', answer: 'FinanceFlow is a free financial calculator platform that provides accurate, easy-to-use tools for calculating EMI, SIP returns, FD maturity, income tax, GST, and more. Our tools are designed to help you make smarter financial decisions.' },
    { question: 'Are the calculations accurate?', answer: 'Yes! Our calculators use bank-grade mathematical formulas. We follow the same calculation methodology used by major banks and financial institutions in India.' },
    { question: 'Is FinanceFlow free to use?', answer: 'Absolutely! All our calculators and financial tools are 100% free. There are no hidden charges, no premium features locked behind paywalls.' },
    { question: 'Is my data safe?', answer: 'All calculations happen directly in your browser. We do not store, transmit, or save any of your financial data. Your privacy is our top priority.' },
    { question: 'Which calculators are available?', answer: 'We offer 20+ calculators including EMI, SIP, FD, RD, PPF, GST, Income Tax, Salary, Compound Interest, Retirement, Inflation, Savings Goal, Loan Eligibility, and more.' },
    { question: 'Can I use these on mobile?', answer: 'Yes! FinanceFlow is fully responsive and optimized for mobile devices. You get the same premium experience on phone, tablet, or desktop.' },
  ];

  return <FAQ items={items} title="Frequently Asked Questions" />;
}


import Link from 'next/link';
import styles from './Footer.module.css';
import { calculators } from '@/data/calculators';

export default function Footer() {
  const popularCalcs = calculators.filter(c => c.featured).slice(0, 6);

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <span className={styles.logoIcon}>₹</span>
              <span className={styles.logoText}>Finance<span className={styles.logoAccent}>Flow</span></span>
            </div>
            <p className={styles.footerDesc}>
              India&apos;s trusted free financial calculator platform. Make smarter financial decisions with our accurate, easy-to-use tools.
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.badge}>🔒 Secure</span>
              <span className={styles.badge}>✅ Free Forever</span>
              <span className={styles.badge}>📱 Mobile Friendly</span>
            </div>
          </div>

          {/* Popular Calculators */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Popular Calculators</h4>
            {popularCalcs.map(c => (
              <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.footerLink}>
                {c.icon} {c.shortTitle} Calculator
              </Link>
            ))}
            <Link href="/calculators" className={styles.footerLinkAccent}>View All →</Link>
          </div>

          {/* Resources */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Resources</h4>
            <Link href="/blog" className={styles.footerLink}>Finance Blog</Link>
            <Link href="/tools" className={styles.footerLink}>Finance Tools</Link>
            <Link href="/blog/best-sip-investment-plans-2025" className={styles.footerLink}>SIP Guide</Link>
            <Link href="/blog/income-tax-saving-strategies" className={styles.footerLink}>Tax Saving Tips</Link>
            <Link href="/blog/retirement-planning-beginners-guide" className={styles.footerLink}>Retirement Guide</Link>
          </div>

          {/* Company */}
          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Company</h4>
            <Link href="/about" className={styles.footerLink}>About Us</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
            <Link href="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footerLink}>Terms & Conditions</Link>
            <Link href="/disclaimer" className={styles.footerLink}>Disclaimer</Link>
            <Link href="/cookie-policy" className={styles.footerLink}>Cookie Policy</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} FinanceFlow. All rights reserved. All calculations are for informational purposes only.</p>
          <p className={styles.footerDisclaimer}>
            Disclaimer: FinanceFlow provides calculators for educational purposes. Results are approximations and should not be considered financial advice. Always consult a certified financial advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}

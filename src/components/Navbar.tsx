'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { calculators, calculatorCategories } from '@/data/calculators';
import { Search, Moon, Sun, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const filteredCalcs = searchQuery
    ? calculators.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="main-nav">
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo} id="nav-logo">
            <span className={styles.logoIcon}>₹</span>
            <span className={styles.logoText}>Finance<span className={styles.logoAccent}>Flow</span></span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <div className={styles.navDropdown}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              ref={megaRef}
            >
              <button className={styles.navLink} id="calculators-menu-btn">
                Calculators <span className={styles.chevron}>▾</span>
              </button>
              {megaOpen && (
                <div className={styles.megaMenu} id="mega-menu">
                  <div className={styles.megaGrid}>
                    {calculatorCategories.map(cat => (
                      <div key={cat} className={styles.megaCol}>
                        <h4 className={styles.megaCatTitle}>{cat}</h4>
                        {calculators.filter(c => c.category === cat).map(c => (
                          <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.megaItem} onClick={() => setMegaOpen(false)}>
                            <span className={styles.megaIcon}>{c.icon}</span>
                            <span>{c.shortTitle}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/blog" className={styles.navLink}>Blog</Link>
            <Link href="/tools" className={styles.navLink}>Tools</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
          </div>

          <div className={styles.navActions}>
            <button className={`${styles.actionBtn}`} onClick={() => setSearchOpen(!searchOpen)} id="search-toggle" aria-label="Search">
              <Search size={20} />
            </button>
            <button className={styles.actionBtn} onClick={toggleTheme} id="theme-toggle" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)} id="mobile-menu-btn" aria-label="Menu">
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className={styles.searchBar} id="search-bar">
            <div className="container">
              <div className={styles.searchInner}>
                <span className={styles.searchIcon}><Search size={18} /></span>
                <input ref={searchRef} type="text" placeholder="Search calculators, tools, articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.searchInput} id="global-search-input" />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className={styles.searchClose}><X size={18} /></button>
              </div>
              {searchQuery && (
                <div className={styles.searchResults}>
                  {filteredCalcs.length > 0 ? filteredCalcs.map(c => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.searchResultItem} onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
                      <span>{c.icon}</span>
                      <div>
                        <div className={styles.searchResultTitle}>{c.title}</div>
                        <div className={styles.searchResultDesc}>{c.description}</div>
                      </div>
                    </Link>
                  )) : (
                    <div className={styles.searchEmpty}>No results found for &quot;{searchQuery}&quot;</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <div className={styles.mobileMenu} onClick={e => e.stopPropagation()} id="mobile-menu">
            <div className={styles.mobileHeader}>
              <span className={styles.logoText}>Finance<span className={styles.logoAccent}>Flow</span></span>
              <button onClick={() => setMobileOpen(false)} className={styles.mobileClose}><X size={24} /></button>
            </div>
            <div className={styles.mobileLinks}>
              <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
              <div className={styles.mobileSectionTitle}>Calculators</div>
              {calculators.filter(c => c.featured).map(c => (
                <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  {c.icon} {c.shortTitle}
                </Link>
              ))}
              <Link href="/calculators" className={`${styles.mobileLink} ${styles.mobileViewAll}`} onClick={() => setMobileOpen(false)}>View All Calculators →</Link>
              <Link href="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link href="/ai-advisor" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>AI Advisor</Link>
              <Link href="/tools" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Tools</Link>
              <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 'var(--nav-height)' }} />
    </>
  );
}

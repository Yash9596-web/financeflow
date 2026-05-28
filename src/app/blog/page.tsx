import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Finance Blog — Investment, Loans, Taxes & Retirement Guides',
  description: 'Expert financial advice, tax saving strategies, investment guides, and personal finance tips to help you make smarter money decisions.',
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-badge">📝 Blog</span>
          <h1 className={styles.heroTitle}>Finance <span className="text-gradient">Insights</span> & Guides</h1>
          <p className={styles.heroDesc}>Expert advice to help you master your personal finances, investments, and taxes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.categoryFilter}>
            <Link href="/blog" className={`${styles.filterBtn} ${styles.filterActive}`}>All Articles</Link>
            {blogCategories.map(cat => (
              <Link key={cat} href={`/blog?category=${cat.toLowerCase()}`} className={styles.filterBtn}>{cat}</Link>
            ))}
          </div>

          <div className={styles.blogGrid}>
            {blogPosts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`${styles.blogCard} stagger-${i % 4 + 1}`}>
                <div className={styles.blogCardTop}>
                  <span className={styles.blogCategory}>{post.category}</span>
                  <span className={styles.blogTime}>{post.readTime}</span>
                </div>
                <h3 className={styles.blogCardTitle}>{post.title}</h3>
                <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
                <div className={styles.blogCardFooter}>
                  <div className={styles.blogAuthorInfo}>
                    <span className={styles.blogAuthor}>{post.author}</span>
                    <span className={styles.blogDate}>{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span className={styles.blogReadMore}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container">
        <div className="ad-slot ad-slot-banner">Advertisement</div>
      </div>
    </div>
  );
}

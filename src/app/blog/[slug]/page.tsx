import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import { getFeaturedCalculators } from '@/data/calculators';
import styles from '../blog.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | FinanceFlow Blog`,
    description: post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) notFound();

  const calcs = getFeaturedCalculators().slice(0, 3);

  // Note: For a real app, content would come from a CMS or markdown files.
  // We're stubbing it out to show the layout.

  return (
    <div className={styles.articlePage}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadSep}>›</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.breadSep}>›</span>
          <span className={styles.breadCurrent}>{post.category}</span>
        </nav>

        <div className={styles.articleLayout}>
          <article className={styles.articleContent}>
            <header className={styles.articleHeader}>
              <div className={styles.articleMeta}>
                <span className={styles.blogCategory}>{post.category}</span>
                <span className={styles.blogTime}>{post.readTime} read</span>
              </div>
              <h1 className={styles.articleTitle}>{post.title}</h1>
              <div className={styles.articleAuthorRow}>
                <div className={styles.authorAvatar}>{post.author.charAt(0)}</div>
                <div>
                  <div className={styles.authorName}>{post.author}</div>
                  <div className={styles.authorDate}>{new Date(post.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
            </header>

            <div className="ad-slot ad-slot-banner">Advertisement</div>

            <div className={styles.articleBody}>
              <p className={styles.lead}>{post.excerpt}</p>
              
              <h2>Understanding the Basics</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.</p>
              
              <div className={styles.contentAdBox}>
                <div className="ad-slot ad-slot-banner" style={{ margin: 0 }}>Advertisement</div>
              </div>

              <h3>Key Strategies</h3>
              <ul>
                <li><strong>Start Early:</strong> Compounding works best when given time.</li>
                <li><strong>Be Consistent:</strong> Regular investments trump timing the market.</li>
                <li><strong>Review Annually:</strong> Ensure your investments align with your goals.</li>
              </ul>

              <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.</p>

              <h2>Conclusion</h2>
              <p>Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.</p>
            </div>

            <div className={styles.articleTags}>
              {post.tags.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>

            <div className={styles.shareSection}>
              <h3>Share this article</h3>
              <div className={styles.shareButtons}>
                <button className="btn btn-secondary btn-sm">Twitter</button>
                <button className="btn btn-secondary btn-sm">LinkedIn</button>
                <button className="btn btn-secondary btn-sm">Facebook</button>
                <button className="btn btn-secondary btn-sm">Copy Link</button>
              </div>
            </div>
          </article>

          <aside className={styles.articleSidebar}>
            <div className="ad-slot ad-slot-rectangle">Advertisement</div>

            <div className={styles.sidebarWidget}>
              <h3 className={styles.widgetTitle}>Related Calculators</h3>
              <div className={styles.widgetCalcs}>
                {calcs.map(c => (
                  <Link key={c.slug} href={`/calculators/${c.slug}`} className={styles.widgetCalcCard}>
                    <span className={styles.widgetCalcIcon}>{c.icon}</span>
                    <div>
                      <h4>{c.title}</h4>
                      <p>Calculate Now →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.sidebarWidget}>
              <h3 className={styles.widgetTitle}>Popular Topics</h3>
              <div className={styles.widgetTags}>
                <Link href="/blog?tag=investing" className={styles.tag}>Investing</Link>
                <Link href="/blog?tag=tax" className={styles.tag}>Tax Saving</Link>
                <Link href="/blog?tag=retirement" className={styles.tag}>Retirement</Link>
                <Link href="/blog?tag=loans" className={styles.tag}>Loans</Link>
              </div>
            </div>

            <div className={styles.stickyAd}>
              <div className="ad-slot ad-slot-rectangle">Advertisement</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

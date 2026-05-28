'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem { question: string; answer: string; }

export default function FAQ({ items, title = 'Frequently Asked Questions' }: { items: FAQItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.faqSection} id="faq-section">
      <div className={styles.faqHeader}>
        <span className="section-badge">❓ FAQ</span>
        <h2>{title}</h2>
      </div>
      <div className={styles.faqList}>
        {items.map((item, i) => (
          <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.open : ''}`} id={`faq-item-${i}`}>
            <button className={styles.faqQuestion} onClick={() => setOpenIndex(openIndex === i ? null : i)} aria-expanded={openIndex === i}>
              <span>{item.question}</span>
              <span className={styles.faqIcon}>{openIndex === i ? '−' : '+'}</span>
            </button>
            <div className={styles.faqAnswer} style={{ maxHeight: openIndex === i ? '500px' : '0' }}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

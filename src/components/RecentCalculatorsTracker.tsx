'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { calculators } from '@/data/calculators';

interface Props {
  currentSlug: string;
}

export default function RecentCalculatorsTracker({ currentSlug }: Props) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      // Get existing
      const stored = localStorage.getItem('ff-recent-calcs');
      let history: string[] = stored ? JSON.parse(stored) : [];
      
      // Remove current if exists so we can bump it to the front
      history = history.filter(slug => slug !== currentSlug);
      
      // Add to front
      history.unshift(currentSlug);
      
      // Keep only last 5
      history = history.slice(0, 5);
      
      localStorage.setItem('ff-recent-calcs', JSON.stringify(history));
      
      // Update state, filtering out current so we only show *other* recent ones
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRecent(history.filter(s => s !== currentSlug));
    } catch (e) {
      console.error('Failed to parse recent calculators', e);
    }
  }, [currentSlug]);

  if (recent.length === 0) return null;

  const recentCalcsData = recent
    .map(slug => calculators.find(c => c.slug === slug))
    .filter(Boolean) as typeof calculators;

  if (recentCalcsData.length === 0) return null;

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">⏱️ Your History</span>
          <h2>Recently Used Calculators</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {recentCalcsData.map(c => (
             <Link key={c.slug} href={`/calculators/${c.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
               <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
               <div>
                 <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.shortTitle}</h4>
                 <p style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Calculate Again →</p>
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

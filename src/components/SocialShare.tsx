'use client';

export default function SocialShare({ url, title }: { url: string; title: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <button className="btn btn-secondary btn-sm" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${url}&text=Check out this ${title} on FinanceFlow`, '_blank')}>Twitter</button>
      <button className="btn btn-secondary btn-sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')}>Facebook</button>
      <button className="btn btn-secondary btn-sm" onClick={() => window.open(`https://api.whatsapp.com/send?text=Check out this ${title}: ${url}`, '_blank')}>WhatsApp</button>
      <button className="btn btn-secondary btn-sm" onClick={() => { navigator.clipboard.writeText(url); alert('Link copied!'); }}>Copy Link</button>
    </div>
  );
}

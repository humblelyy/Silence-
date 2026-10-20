export default function SocialIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'Instagram') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
  if (name === 'YouTube') return <svg {...common}><path d="M22 12s0-4-1-5-4-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 4 1 9 1 8 0 9-1 1-5 1-5Z"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>;
  if (name === 'Discord') return <svg {...common}><path d="M7 7.5A14 14 0 0 1 10 6l.5 1a12 12 0 0 1 3 0l.5-1a14 14 0 0 1 3 1.5c1.5 2.2 2 4.6 1.8 7a13 13 0 0 1-4 2l-.8-1.3M6 7.5c-1.5 2.2-2 4.6-1.8 7a13 13 0 0 0 4 2L9 15.2M9 11.5h.01M15 11.5h.01"/></svg>;
  if (name === 'TikTok') return <svg {...common}><path d="M14 4v10.2a4.2 4.2 0 1 1-3.5-4.1M14 4c.5 2.6 2.2 4.2 5 4.5"/></svg>;
  if (name === 'Kick') return <svg {...common}><path d="M4 4h6v6l5-6h5l-6 8 6 8h-5l-5-6v6H4z"/></svg>;
  return <svg {...common}><path d="M5 7h14M5 12h14M5 17h14"/></svg>;
}

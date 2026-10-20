'use client';

import { useEffect, useState } from 'react';

/** Running 24fps timecode for the hero "viewer" — pauses when the tab is hidden or motion is reduced. */
export default function HeroTimecode() {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => { if (!document.hidden) setFrames(f => f + 1); }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const s = Math.floor(frames / 24);
  return <span className="timecode" aria-hidden="true">{pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:{pad(frames % 24)}</span>;
}

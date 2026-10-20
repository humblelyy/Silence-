'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);
import { YouTubeThumbnail } from '@/components/VideoPlayer';

/**
 * Two counter-scrolling rows of edit cards (inspired by Jitter's template rows).
 * Rows pause on hover/focus; clicking a card opens the edit in the gallery's player.
 */
export default function ShowreelRows({ projects }: { projects: Project[] }) {
  // Repeat enough times that one copy is wider than any viewport, then duplicate for a seamless loop.
  const base = Array.from({ length: Math.max(2, Math.ceil(8 / projects.length)) }, () => projects).flat();
  const rows = [base, [...base].reverse()];
  const ref = useRef<HTMLDivElement>(null);

  // Skew the rows with scroll velocity so the reel "whips" when you scroll fast.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rows = el.querySelectorAll('.reel__row');
    const setters = Array.from(rows, row => gsap.quickTo(row, 'skewX', { duration: 0.5, ease: 'power3.out' }));
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: self => {
        const v = gsap.utils.clamp(-12, 12, self.getVelocity() / -250);
        setters.forEach((set, i) => set(i % 2 ? -v : v));
      },
    });
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => { clearTimeout(idle); idle = setTimeout(() => setters.forEach(set => set(0)), 120); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { st.kill(); clearTimeout(idle); window.removeEventListener('scroll', onScroll); };
  }, []);

  const open = (slug: string) => window.dispatchEvent(new CustomEvent('silence:open-project', { detail: slug }));

  return (
    <div className="reel" aria-label="Edit rows" ref={ref}>
      {rows.map((row, r) => (
        <div className={`reel__row ${r === 1 ? 'reel__row--reverse' : ''}`} key={r}>
          <div className="reel__track">
            {[...row, ...row].map((p, i) => {
              const clone = i >= row.length || i >= projects.length;
              return (
                <button
                  type="button"
                  key={`${p.slug}-${i}`}
                  className="reel__card"
                  onClick={() => open(p.slug)}
                  tabIndex={clone ? -1 : 0}
                  aria-hidden={clone || undefined}
                  aria-label={clone ? undefined : `Watch ${p.title}`}
                  data-cursor-label="PLAY"
                >
                  <YouTubeThumbnail videoId={p.youtubeId} alt="" className="reel__thumb" />
                  <span className="reel__open" aria-hidden="true">Watch edit ↗</span>
                  <span className="reel__caption"><strong>{p.title}</strong><span>{p.anime}</span></span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

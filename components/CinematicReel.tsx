'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned "cinema" scene: a small framed card grows into a full-bleed letterboxed screen as you scroll,
 * the page fades to black, and the edits cut one after another like a reel. Click to play the current cut.
 */
export default function CinematicReel({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) { gsap.set('.cine__screen', { clipPath: 'inset(0% 0% 0% 0% round 0px)' }); return; }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: self => {
            // After the screen opens (first 25%), step through the cuts.
            const p = Math.max(0, (self.progress - 0.25) / 0.75);
            setActive(Math.min(projects.length - 1, Math.floor(p * projects.length)));
          },
        },
      });
      tl.fromTo('.cine__bg', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0)
        .fromTo('.cine__screen', { clipPath: 'inset(22% 26% 22% 26% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.25, ease: 'power2.inOut' }, 0)
        .fromTo('.cine__media', { scale: 1.35 }, { scale: 1, duration: 0.25, ease: 'power2.inOut' }, 0)
        .fromTo('.cine__bar', { scaleY: 0 }, { scaleY: 1, duration: 0.12, ease: 'power2.out' }, 0.18)
        .fromTo('.cine__intro', { opacity: 1, y: 0 }, { opacity: 0, y: -60, duration: 0.12 }, 0.05)
        .fromTo('.cine__hud', { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.22)
        .to('.cine__progress i', { scaleX: 1, duration: 0.75, ease: 'none' }, 0.25);
    }, el);
    return () => ctx.revert();
  }, [projects.length]);

  const current = projects[active];
  const open = () => window.dispatchEvent(new CustomEvent('silence:open-project', { detail: current.slug }));

  return (
    <section className="cine" ref={root} aria-label="Showreel">
      <div className="cine__sticky">
        <div className="cine__bg" aria-hidden="true" />
        <div className="cine__intro" aria-hidden="true"><span>Scroll</span> to roll the reel</div>
        <div className="cine__screen">
          <div className="cine__media">
            {projects.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.slug} src={`https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`} alt="" className={i === active ? 'is-active' : ''} />
            ))}
          </div>
          <span className="cine__vignette" aria-hidden="true" />
          <span className="cine__bar cine__bar--top" aria-hidden="true" />
          <span className="cine__bar cine__bar--bottom" aria-hidden="true" />
          <div className="cine__hud">
            <div className="cine__hud-top">
              <span className="cine__rec"><i /> REC</span>
              <span>CUT {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            <div className="cine__hud-bottom">
              <div key={current.slug} className="cine__title">
                <span className="eyebrow">{current.anime}</span>
                <strong>{current.title}</strong>
              </div>
              <button type="button" className="cine__play" onClick={open} data-cursor-label="PLAY">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                Play this cut
              </button>
            </div>
            <div className="cine__progress" aria-hidden="true"><i /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

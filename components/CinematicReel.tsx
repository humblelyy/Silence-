'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/projects';
import FadeContent from '@/components/FadeContent';

gsap.registerPlugin(ScrollTrigger);

/** Share of the pinned scroll spent on the intro (masked heading → screen opening). */
const INTRO = 0.18;

/**
 * One continuous, pinned, scroll-driven reel.
 * 1. The section pins; a video-filled "Scroll to roll the reel" heading sits over a small framed screen.
 * 2. Scrolling dissolves the heading and opens the screen to full-bleed with letterbox bars.
 * 3. The rest of the pinned distance is split evenly between edits: each cut plays its own video,
 *    and crossing a boundary mist-dissolves into the next one.
 * 4. When the last cut has had its share, the pin releases and the page scrolls on normally.
 */
export default function CinematicReel({ projects, introVideo, introPoster }: { projects: Project[]; introVideo: string; introPoster?: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<Project | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const st = {
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? false : 0.6,
        onUpdate: (self: ScrollTrigger) => {
          const p = Math.max(0, (self.progress - INTRO) / (1 - INTRO));
          const next = Math.min(projects.length - 1, Math.floor(p * projects.length));
          if (next !== activeRef.current) { setPrevious(projects[activeRef.current]); activeRef.current = next; setActive(next); }
          el.style.setProperty('--cut-progress', String((p * projects.length) % 1));
          if (reduced) {
            const intro = el.querySelector<HTMLElement>('.cine__intro');
            if (intro) intro.style.opacity = self.progress < INTRO ? '1' : '0';
            const screen = el.querySelector<HTMLElement>('.cine__screen');
            if (screen) screen.style.clipPath = self.progress < INTRO
              ? 'inset(34% 8% 14% 8% round 20px)'
              : 'inset(0% 0% 0% 0% round 0px)';
          }
        },
      };
      if (reduced) {
        // No choreography: screen is open, cuts still follow scroll but switch instantly.
        gsap.set('.cine__screen', { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
        gsap.set(['.cine__bg', '.cine__hud'], { opacity: 1 });
        gsap.set('.cine__intro', { opacity: 1 });
        gsap.set('.cine__screen', { clipPath: 'inset(34% 8% 14% 8% round 20px)' });
        ScrollTrigger.create(st);
        return;
      }
      gsap.timeline({ scrollTrigger: st })
        .fromTo('.cine__bg', { opacity: 0 }, { opacity: 1, duration: INTRO, ease: 'none' }, 0)
        .fromTo('.cine__intro', { opacity: 1, scale: 1, filter: 'blur(0px)' }, { opacity: 0, scale: 1.25, filter: 'blur(14px)', duration: INTRO * 0.8, ease: 'power2.in' }, 0)
        .fromTo('.cine__screen', { clipPath: 'inset(42% 20% 8% 20% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: INTRO, ease: 'power2.inOut' }, 0)
        .fromTo('.cine__media', { scale: 1.3 }, { scale: 1, duration: INTRO, ease: 'power2.inOut' }, 0)
        .fromTo('.cine__bar', { scaleY: 0 }, { scaleY: 1, duration: INTRO * 0.5, ease: 'power2.out' }, INTRO * 0.6)
        .fromTo('.cine__hud', { opacity: 0 }, { opacity: 1, duration: INTRO * 0.4 }, INTRO * 0.8)
        .to('.cine__progress i', { scaleX: 1, duration: 1 - INTRO, ease: 'none' }, INTRO);
    }, el);
    return () => ctx.revert();
  }, [projects.length]);


  const current = projects[active];
  useEffect(() => {
    if (!previous) return;
    const timer = window.setTimeout(() => setPrevious(null), 1900);
    return () => window.clearTimeout(timer);
  }, [active, previous]);
  const open = () => window.dispatchEvent(new CustomEvent('silence:open-project', { detail: current.slug }));

  return (
    // Height scales with the number of cuts so every edit gets the same scroll distance.
    <section className="cine" ref={root} aria-label="Showreel" style={{ height: `${100 + (projects.length + 1) * 70}svh` }}>
      <div className="cine__sticky">
        <div className="cine__bg" aria-hidden="true" />
        <div className="cine__screen">
          <div className="cine__media">
            {/* The reel uses poster frames only. YouTube playback starts only after the visitor
                clicks “Play this cut”, which opens the selected project in its player modal. */}
            <div className="cine__cut-transition" aria-hidden="true">
              {previous && (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`previous-${previous.slug}`} className="cine__cut-image cine__cut-image--out" src={`https://i.ytimg.com/vi/${previous.youtubeId}/maxresdefault.jpg`} alt="" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={current.slug} className="cine__cut-image cine__cut-image--in" src={`https://i.ytimg.com/vi/${current.youtubeId}/maxresdefault.jpg`} alt="" />
            </div>
          </div>
          <span className="cine__vignette" aria-hidden="true" />
          {/* Keep the scroll instruction inside the reel card, not as a separate floating panel. */}
          <div className="cine__intro">
            <div className="cine__intro-media" aria-hidden="true">
              {introVideo && /\.(mp4|webm|ogg)(?:$|[?#])/i.test(introVideo) ? (
                <video src={introVideo} poster={introPoster || undefined} autoPlay muted loop playsInline preload="metadata" />
              ) : introPoster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={introPoster} alt="" />
              ) : null}
            </div>
            <div className="cine__intro-shade" aria-hidden="true" />
            <h2 className="cine__intro-title">Scroll to<br />roll the reel</h2>
          </div>
          <span className="cine__bar cine__bar--top" aria-hidden="true" />
          <span className="cine__bar cine__bar--bottom" aria-hidden="true" />
          <div className="cine__hud">
            <div className="cine__hud-top">
              <span className="cine__rec"><i /> REC</span>
              <span>CUT {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            <div className="cine__hud-bottom">
              <FadeContent key={current.slug} className="cine__title" effect="mist" duration={1.4} ease="power2.out" stagger={0.1} immediate>
                <span className="eyebrow">{current.anime}</span>
                <strong>{current.title}</strong>
              </FadeContent>
              <button type="button" className="cine__play" onClick={open} data-cursor-label="PLAY">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
                Play this cut
              </button>
            </div>
            <div className="cine__ticks" aria-hidden="true">
              {projects.map((p, i) => <i key={p.slug} className={i < active ? 'is-done' : i === active ? 'is-active' : ''} />)}
            </div>
            <div className="cine__progress" aria-hidden="true"><i /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

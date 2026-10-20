'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/projects';
import FadeContent from '@/components/FadeContent';
import MaskedHeading from '@/components/MaskedHeading';
import HeroVideo from '@/components/HeroVideo';

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
  const [entered, setEntered] = useState(false);
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
          setEntered(self.progress > INTRO * 0.7);
          const p = Math.max(0, (self.progress - INTRO) / (1 - INTRO));
          const next = Math.min(projects.length - 1, Math.floor(p * projects.length));
          if (next !== activeRef.current) { activeRef.current = next; setActive(next); }
          el.style.setProperty('--cut-progress', String((p * projects.length) % 1));
        },
      };
      if (reduced) {
        // No choreography: screen is open, cuts still follow scroll but switch instantly.
        gsap.set('.cine__screen', { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
        gsap.set(['.cine__bg', '.cine__hud'], { opacity: 1 });
        gsap.set('.cine__intro', { opacity: 0 });
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

  // Mist crossfade between cuts: the outgoing frame dissolves into blur while the next clears from it.
  const prev = useRef(0);
  useEffect(() => {
    const el = root.current;
    if (!el || prev.current === active) return;
    const cuts = el.querySelectorAll<HTMLElement>('.cine__cut');
    const out = cuts[prev.current], inn = cuts[active];
    prev.current = active;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cuts, { opacity: 0 }); gsap.set(inn, { opacity: 1 }); return;
    }
    gsap.killTweensOf([out, inn]);
    gsap.to(out, { opacity: 0, filter: 'blur(24px)', scale: 1.06, duration: 1.4, ease: 'power2.out' });
    gsap.fromTo(inn, { opacity: 0, filter: 'blur(24px)', scale: 1.12 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.4, ease: 'power2.out' });
  }, [active]);

  const current = projects[active];
  const open = () => window.dispatchEvent(new CustomEvent('silence:open-project', { detail: current.slug }));

  return (
    // Height scales with the number of cuts so every edit gets the same scroll distance.
    <section className="cine" ref={root} aria-label="Showreel" style={{ height: `${100 + (projects.length + 1) * 70}svh` }}>
      <div className="cine__sticky">
        <div className="cine__bg" aria-hidden="true" />
        <div className="cine__screen">
          <div className="cine__media">
            {projects.map((p, i) => (
              <div key={p.slug} className="cine__cut" style={{ opacity: i === 0 ? 1 : 0 }} aria-hidden={i !== active}>
                {/* Poster underneath; the cut's own video only loads while it's the active cut. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`} alt="" />
                {entered && i === active && <HeroVideo url={p.youtubeUrl} />}
              </div>
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
        {/* Intro stage of the same pinned scene — dissolves as the screen opens. */}
        <div className="cine__intro">
          <MaskedHeading text="Scroll to roll the reel" mediaType="video" src={introVideo} poster={introPoster} fillScale={1.3} parallax={0} reveal="scale" trigger="view" spotlight spotlightRadius={180} outline />
        </div>
      </div>
    </section>
  );
}

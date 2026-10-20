'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  mediaType?: 'video' | 'image';
  src: string;
  poster?: string;
  /** Media is scaled up by this much and settles to 1 as it reveals. */
  fillScale?: number;
  /** Vertical parallax travel of the media, in px, across the scroll. */
  parallax?: number;
  reveal?: 'scale' | 'fade' | 'none';
  trigger?: 'view' | 'load';
  /** A soft circle around the cursor where the full media shows through. */
  spotlight?: boolean;
  spotlightRadius?: number;
  /** Draw a thin outline around the letters. */
  outline?: boolean;
  className?: string;
};

/**
 * MaskedHeading — huge type with video (or an image) playing *inside* the letters.
 * Uses a blend-mode knockout so it works with any font and stays real, selectable text.
 */
export default function MaskedHeading({
  text, mediaType = 'video', src, poster, fillScale = 1.3, parallax = 34, reveal = 'scale',
  trigger = 'view', spotlight = false, spotlightRadius = 180, outline = false, className = '',
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = root.current, m = media.current;
    if (!el || !m) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(isReduced);
    if (isReduced) return;
    const ctx = gsap.context(() => {
      if (reveal !== 'none') {
        gsap.fromTo(m, { scale: reveal === 'scale' ? fillScale : 1, opacity: reveal === 'fade' ? 0 : 1 }, {
          scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out',
          scrollTrigger: trigger === 'view' ? { trigger: el, start: 'top 80%', once: true } : undefined,
        });
        gsap.fromTo(el.querySelector('.masked__text'), { opacity: 0, letterSpacing: '0.04em' }, {
          opacity: 1, letterSpacing: '-0.06em', duration: 1.4, ease: 'power3.out',
          scrollTrigger: trigger === 'view' ? { trigger: el, start: 'top 80%', once: true } : undefined,
        });
      }
      if (parallax) {
        gsap.fromTo(m.querySelector('.masked__inner'), { yPercent: 0, y: -parallax }, {
          y: parallax, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [fillScale, parallax, reveal, trigger]);

  useEffect(() => {
    const el = root.current;
    if (!el || !spotlight) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      el.classList.add('is-spot');
    };
    const leave = () => el.classList.remove('is-spot');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [spotlight]);

  return (
    <div ref={root} className={`masked ${outline ? 'masked--outline' : ''} ${className}`.trim()} style={{ ['--spot-r' as string]: `${spotlightRadius}px` }}>
      <div ref={media} className="masked__media" aria-hidden="true">
        <div className="masked__inner">
          {mediaType === 'video' && !reduced
            ? <video src={src} poster={poster} autoPlay muted loop playsInline preload="auto" />
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={mediaType === 'image' ? src : poster} alt="" />}
        </div>
      </div>
      {/* Knockout layer: page-coloured plate with the text "cut out" via blend mode. */}
      <div className="masked__plate" aria-hidden="true"><span className="masked__text">{text}</span></div>
      {spotlight && <div className="masked__spot" aria-hidden="true" />}
      {outline && <div className="masked__outline" aria-hidden="true"><span className="masked__text">{text}</span></div>}
      <h2 className="sr-only">{text}</h2>
    </div>
  );
}

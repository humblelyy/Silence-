'use client';

import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Effect = 'fade' | 'mist' | 'rise' | 'zoom';

const FROM: Record<Effect, gsap.TweenVars> = {
  fade: { opacity: 0 },
  mist: { opacity: 0, filter: 'blur(18px)', y: 16, scale: 1.02 },
  rise: { opacity: 0, y: 40 },
  zoom: { opacity: 0, scale: 0.94 },
};

type Props = {
  children: ReactNode;
  effect?: Effect;
  duration?: number;
  ease?: string;
  /** Delay between each direct child, in seconds. */
  stagger?: number;
  /** Portion of the element that must be visible before it plays (0–1). */
  threshold?: number;
  delay?: number;
  /** Play immediately on mount instead of on scroll (useful for content that swaps in place). */
  immediate?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'span';
};

/**
 * FadeContent (React Bits–style API). Fades each direct child in turn when the block enters the viewport.
 * The "mist" effect lifts children out of a soft blur.
 */
export default function FadeContent({
  children, effect = 'fade', duration = 1, ease = 'power2.out', stagger = 0.1, threshold = 0.1,
  delay = 0, immediate = false, className = '', style, as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.children) as HTMLElement[];
    if (!targets.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, { ...FROM[effect] }, {
        opacity: 1, filter: 'blur(0px)', y: 0, scale: 1,
        duration, ease, stagger, delay,
        clearProps: 'filter,transform',
        scrollTrigger: immediate ? undefined : { trigger: el, start: `top ${Math.round((1 - threshold) * 100)}%`, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [effect, duration, ease, stagger, threshold, delay, immediate]);

  return (
    <Tag ref={ref as never} className={`fade-content ${className}`.trim()} style={style}>
      {Children.toArray(children)}
    </Tag>
  );
}

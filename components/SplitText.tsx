'use client';

import { createElement, useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type TweenVars = gsap.TweenVars;

export type SplitTextProps = {
  text: string;
  className?: string;
  /** Stagger between parts, in milliseconds (React Bits convention). */
  delay?: number;
  /** Duration of each part, in seconds. */
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: TweenVars;
  to?: TweenVars;
  threshold?: number;
  rootMargin?: string;
  /** "view" plays when scrolled into view, "load" plays immediately on mount. */
  trigger?: 'view' | 'load';
  /** Extra wait before starting, in seconds (useful to sync with the loading intro). */
  startDelay?: number;
  tag?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  textAlign?: CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
};

/**
 * GSAP-powered SplitText, adapted from React Bits (SplitText-JS-CSS).
 * Text stays readable to screen readers and fully visible when motion is reduced.
 */
export default function SplitText({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  trigger = 'view',
  startDelay = 0,
  tag = 'p',
  textAlign = 'left',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const onComplete = useRef(onLetterAnimationComplete);
  onComplete.current = onLetterAnimationComplete;
  // Serialise tween configs so inline object props don't retrigger the effect each render.
  const fromKey = JSON.stringify(from);
  const toKey = JSON.stringify(to);

  useEffect(() => {
    if (!document.fonts || document.fonts.status === 'loaded') setFontsReady(true);
    else document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !fontsReady) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.visibility = 'visible';
      return;
    }

    const ctx = gsap.context(() => {
      const split = new GSAPSplitText(el, {
        type: splitType,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        aria: 'auto',
      });
      const targets =
        splitType.includes('chars') && split.chars.length ? split.chars
          : splitType.includes('words') && split.words.length ? split.words
            : split.lines;

      gsap.set(el, { visibility: 'visible' });
      const start = `top ${(1 - threshold) * 100}%${/^-?\d+(px)?$/.test(rootMargin) ? `${parseFloat(rootMargin) < 0 ? '-=' : '+='}${Math.abs(parseFloat(rootMargin))}` : ''}`;

      gsap.fromTo(targets, { ...JSON.parse(fromKey) }, {
        ...JSON.parse(toKey),
        duration,
        ease,
        delay: startDelay,
        stagger: delay / 1000,
        force3D: true,
        willChange: 'transform, opacity',
        scrollTrigger: trigger === 'view' ? { trigger: el, start, once: true, fastScrollEnd: true } : undefined,
        onComplete: () => onComplete.current?.(),
      });

      return () => split.revert();
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration, ease, splitType, fromKey, toKey, threshold, rootMargin, trigger, startDelay, fontsReady]);

  return createElement(
    tag,
    { ref, className: `split-parent ${className}`, style: { textAlign, visibility: 'hidden' } },
    text,
  );
}

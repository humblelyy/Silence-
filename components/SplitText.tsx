'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

type Props = { text: string; className?: string; effect?: 'rise' | 'fade' | 'blur'; splitType?: 'chars' | 'words'; delay?: number; duration?: number; staggerFrom?: 'start' | 'end' | 'center'; trigger?: 'load' | 'view'; hoverEffect?: 'lift' | 'none'; loop?: boolean; loopDelay?: number; mask?: boolean; threshold?: number; rootMargin?: string; textAlign?: 'left' | 'center' | 'right'; onLetterAnimationComplete?: () => void };
export default function SplitText({ text, className = '', effect = 'rise', splitType = 'chars', delay = 25, duration = 0.8, trigger = 'load', hoverEffect = 'none', mask = true, textAlign = 'left', onLetterAnimationComplete }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const play = () => {
      node.classList.add('split-text--visible');
      timer = setTimeout(() => onLetterAnimationComplete?.(), duration * 1000 + delay * text.length);
    };
    if (trigger === 'load') { requestAnimationFrame(play); }
    else {
      const observer = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { play(); observer.disconnect(); } }, { threshold: 0.1, rootMargin: '-40px' });
      observer.observe(node);
      return () => { observer.disconnect(); if (timer) clearTimeout(timer); };
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [delay, duration, onLetterAnimationComplete, text.length, trigger]);
  const parts = splitType === 'words' ? text.split(' ') : Array.from(text);
  return <span ref={ref} className={`split-text split-text--${effect} ${mask ? 'split-text--mask' : ''} ${hoverEffect === 'lift' ? 'split-text--hover-lift' : ''} ${className}`} style={{ textAlign, '--split-duration': `${duration}s`, '--split-delay': `${delay}ms` } as CSSProperties} aria-label={text}><span className="split-text__sr">{text}</span>{parts.map((part, i) => <span aria-hidden="true" className="split-text__part" key={`${part}-${i}`} style={{ ['--split-index' as string]: i }}>{part === ' ' ? '\u00a0' : part}{splitType === 'words' && i < parts.length - 1 ? '\u00a0' : ''}</span>)}</span>;
}

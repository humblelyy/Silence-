'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { Project } from '@/lib/projects';
import VideoPlayer, { YouTubeThumbnail } from '@/components/VideoPlayer';

type Filter = { label: string; test: (p: Project) => boolean };

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  // Only offer filters that actually return work, so no button leads to an empty grid.
  const filters = useMemo<Filter[]>(() => {
    const list: Filter[] = [{ label: 'All', test: () => true }];
    if (projects.some(p => p.featured)) list.push({ label: 'Best edits', test: p => p.featured });
    for (const c of Array.from(new Set(projects.map(p => p.category))).filter(c => c !== 'Featured')) {
      list.push({ label: c, test: p => p.category === c });
    }
    return list;
  }, [projects]);

  const [filter, setFilter] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const visible = projects.filter((filters.find(f => f.label === filter) ?? filters[0]).test);
  const selected = openIndex === null ? null : visible[openIndex] ?? null;

  // Animate cards in whenever the filter changes.
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.work-card');
    if (!cards?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(cards, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 });
    return () => { tween.kill(); gsap.set(cards, { clearProps: 'opacity,transform' }); };
  }, [filter]);

  // Other parts of the page (e.g. the showreel rows) can open an edit by slug.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const i = projects.findIndex(p => p.slug === slug);
      if (i < 0) return;
      lastTrigger.current = document.activeElement as HTMLElement | null;
      setFilter('All');
      setOpenIndex(i);
    };
    window.addEventListener('silence:open-project', onOpen);
    return () => window.removeEventListener('silence:open-project', onOpen);
  }, [projects]);

  const backdropRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Spring entrance whenever the modal mounts.
  const isOpen = openIndex !== null;
  useLayoutEffect(() => {
    if (!isOpen || reduced()) return;
    const dialog = dialogRef.current, backdrop = backdropRef.current;
    if (!dialog || !backdrop) return;
    const tl = gsap.timeline();
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' })
      .fromTo(dialog, { opacity: 0, y: 70, scale: 0.86, rotateX: 10, transformPerspective: 1200 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.05, ease: 'elastic.out(1, 0.72)', clearProps: 'transform' }, 0.05)
      .fromTo(dialog.querySelectorAll('.project-modal__body > *'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'back.out(1.6)' }, 0.25);
    return () => { tl.kill(); };
  }, [isOpen]);

  // Reverse animation, then unmount (which also stops the YouTube player).
  const close = useCallback(() => {
    if (closing.current) return;
    const dialog = dialogRef.current, backdrop = backdropRef.current;
    if (!dialog || !backdrop || reduced()) { setOpenIndex(null); return; }
    closing.current = true;
    dialog.querySelector('iframe')?.remove(); // stop playback immediately
    gsap.timeline({ onComplete: () => { closing.current = false; setOpenIndex(null); } })
      .to(dialog, { opacity: 0, y: 40, scale: 0.9, duration: 0.32, ease: 'back.in(1.7)' })
      .to(backdrop, { opacity: 0, duration: 0.22, ease: 'power1.in' }, '-=0.12');
  }, []);

  // Springy press feedback on a card, then open its modal.
  const openCard = (el: HTMLElement, index: number) => {
    lastTrigger.current = el;
    if (reduced()) { setOpenIndex(index); return; }
    const card = el.closest('.work-card') as HTMLElement | null;
    gsap.timeline()
      .to(card, { scale: 0.96, duration: 0.12, ease: 'power2.out' })
      .to(card, { scale: 1, duration: 0.7, ease: 'elastic.out(1.1, 0.45)', clearProps: 'scale' });
    setTimeout(() => setOpenIndex(index), 140);
  };
  const step = useCallback((dir: 1 | -1) => setOpenIndex(i => (i === null ? i : (i + dir + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    if (openIndex === null) { lastTrigger.current?.focus({ preventScroll: true }); return; }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('.modal-close')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight' && visible.length > 1) step(1);
      else if (e.key === 'ArrowLeft' && visible.length > 1) step(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),iframe');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener('keydown', onKey); };
  }, [openIndex === null, close, step, visible.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="work-filters" role="tablist" aria-label="Filter projects">
        {filters.map(f => {
          const count = projects.filter(f.test).length;
          return (
            <button key={f.label} type="button" role="tab" aria-selected={filter === f.label} className="work-filter" onClick={() => setFilter(f.label)}>
              {f.label}<sup>{String(count).padStart(2, '0')}</sup>
            </button>
          );
        })}
      </div>

      <div className="work-grid" ref={gridRef}>
        {visible.map((project, index) => (
          <article className={`work-card ${index === 0 ? 'work-card--lead' : ''}`} key={project.slug}>
            <button
              type="button"
              className="work-card__button"
              data-cursor-label="PLAY"
              onClick={e => openCard(e.currentTarget, index)}
              aria-label={`Watch ${project.title}`}
            >
              <span className="work-card__media">
                <YouTubeThumbnail videoId={project.youtubeId} alt={`${project.title} thumbnail`} className="work-card__thumb" />
                <span className="work-card__shade" aria-hidden="true" />
                <span className="work-card__index">{String(index + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</span>
                <span className="work-card__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
              </span>
              <span className="work-card__copy">
                <span className="eyebrow">{project.anime}</span>
                <span className="work-card__title">{project.title}</span>
              </span>
            </button>
            <a className="work-card__detail" href={`/projects/${project.slug}`}>Case page ↗</a>
          </article>
        ))}
        {!visible.length && <p className="work-empty">No edits in this category yet.</p>}
      </div>

      {selected && (
        <div className="modal-backdrop" ref={backdropRef} role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
            <header className="project-modal__bar">
              <div className="project-modal__ident">
                <YouTubeThumbnail videoId={selected.youtubeId} alt={`${selected.title} cover`} className="project-modal__cover" />
                <div>
                  <span className="eyebrow">{String(openIndex! + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')} — {selected.category}</span>
                  <strong className="project-modal__name">{selected.title}</strong>
                </div>
              </div>
              <div className="project-modal__nav">
                {visible.length > 1 && <>
                  <button type="button" className="icon-button" onClick={() => step(-1)} aria-label="Previous edit">←</button>
                  <button type="button" className="icon-button" onClick={() => step(1)} aria-label="Next edit">→</button>
                </>}
                <button type="button" className="modal-close" onClick={close} aria-label="Close project">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                  <span>Close</span><kbd>Esc</kbd>
                </button>
              </div>
            </header>
            <VideoPlayer key={selected.youtubeId} videoId={selected.youtubeId} title={selected.title} youtubeUrl={selected.youtubeUrl} autoLoad />
            <div className="project-modal__body">
              <div className="project-modal__about">
                <h2 id="modal-title">{selected.title}</h2>
                <p>{selected.description}</p>
                <div className="project-modal__actions">
                  <a className="button button--primary" href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M22 12s0-4-1-5-4-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 4 1 9 1 8 0 9-1 1-5 1-5Z" fill="currentColor" /><path d="m10 9 5 3-5 3z" fill="var(--bg)" /></svg>
                    Watch on YouTube
                  </a>
                  {selected.projectFilesUrl && <a className="button button--ghost" href={selected.projectFilesUrl} target="_blank" rel="noopener noreferrer">{selected.resourceType === 'Paid' ? 'Get project files ↗' : 'Project files ↗'}</a>}
                </div>
              </div>
              <dl className="meta-list">
                <div><dt>Anime</dt><dd>{selected.anime}</dd></div>
                {selected.music && selected.music !== 'Not specified' && <div><dt>Music</dt><dd>{selected.music}</dd></div>}
                <div><dt>Techniques</dt><dd>{selected.techniques.join(' · ')}</dd></div>
                {selected.software?.length ? <div><dt>Software</dt><dd>{selected.software.join(' · ')}</dd></div> : null}
              </dl>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

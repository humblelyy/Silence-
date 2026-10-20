'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  const close = useCallback(() => setOpenIndex(null), []);
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
              onClick={e => { lastTrigger.current = e.currentTarget; setOpenIndex(index); }}
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
        <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
            <header className="project-modal__bar">
              <span className="eyebrow">{String(openIndex! + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')} — {selected.category}</span>
              <div className="project-modal__nav">
                {visible.length > 1 && <>
                  <button type="button" className="icon-button" onClick={() => step(-1)} aria-label="Previous edit">←</button>
                  <button type="button" className="icon-button" onClick={() => step(1)} aria-label="Next edit">→</button>
                </>}
                <button type="button" className="icon-button modal-close" onClick={close} aria-label="Close">×</button>
              </div>
            </header>
            <VideoPlayer key={selected.youtubeId} videoId={selected.youtubeId} title={selected.title} youtubeUrl={selected.youtubeUrl} autoLoad />
            <div className="project-modal__body">
              <div>
                <h2 id="modal-title">{selected.title}</h2>
                <p>{selected.description}</p>
              </div>
              <dl className="meta-list">
                <div><dt>Anime</dt><dd>{selected.anime}</dd></div>
                <div><dt>Music</dt><dd>{selected.music}</dd></div>
                <div><dt>Techniques</dt><dd>{selected.techniques.join(' · ')}</dd></div>
              </dl>
              <div className="project-modal__actions">
                <a className="button button--primary" href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
                {selected.projectFilesUrl && <a className="button button--ghost" href={selected.projectFilesUrl} target="_blank" rel="noopener noreferrer">{selected.resourceType === 'Paid' ? 'Get project files ↗' : 'Project files ↗'}</a>}
                <a className="text-link" href={`/projects/${selected.slug}`}>Open case page →</a>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

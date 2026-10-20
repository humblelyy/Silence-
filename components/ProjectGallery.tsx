'use client';

import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import SpotlightCard from '@/components/SpotlightCard';

function VideoPreview({ project, active }: { project: Project; active: boolean }) {
  const [failed, setFailed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!active && frame.current) frame.current.src = 'about:blank';
  }, [active]);
  if (failed) return <div className="preview-fallback">SILENCE / {project.category}</div>;
  return <iframe ref={frame} title={`${project.title} muted preview`} src={active ? `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.youtubeId}&playsinline=1&modestbranding=1&vq=small` : 'about:blank'} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" onError={() => setFailed(true)} />;
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const observerRefs = useRef(new Map<string, HTMLDivElement>());
  const filtered = projects.filter(project => filter === 'All' || (filter === 'Best Edits' ? project.featured : project.category === filter));

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActivePreview(visible.target.getAttribute('data-project') || null);
    }, { threshold: [0.45, 0.7] });
    observerRefs.current.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [filtered.length]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [selected]);

  return <>
    <div className="gallery-filters" aria-label="Filter projects">
      {['All', 'Best Edits', 'AMV', '3D / Motion'].map(item => <button key={item} className={filter === item ? 'filter-button active' : 'filter-button'} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <div className="project-grid">
      {filtered.map((project, index) => <div className="project-card-wrap" style={{ animationDelay: `${index * 80}ms` }} key={project.slug} ref={element => { if (element) observerRefs.current.set(project.slug, element); else observerRefs.current.delete(project.slug); }} data-project={project.slug}>
        <SpotlightCard className="project-spotlight">
          <button className="project-card" onClick={() => setSelected(project)} onMouseEnter={() => setActivePreview(project.slug)} onMouseLeave={() => setActivePreview(current => current === project.slug ? null : current)} aria-label={`View details for ${project.title}`}>
            <div className="project-preview">
              <img className="project-thumbnail" src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`} alt={`${project.title} thumbnail`} loading="lazy" onError={event => { event.currentTarget.style.opacity = '0'; event.currentTarget.alt = 'Thumbnail unavailable'; }} />
              <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
              {activePreview === project.slug && <VideoPreview project={project} active />}
              <div className="preview-shade" />
              <span className="preview-open">VIEW PROJECT ↗</span>
            </div>
            <div className="project-card-copy"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3></div><span className="card-arrow">↗</span></div>
          </button>
        </SpotlightCard>
      </div>)}
    </div>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details">×</button>
        <div className="modal-video"><iframe title={selected.title} src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1&mute=0&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
        <div className="modal-copy"><span className="eyebrow">{selected.category} / PROJECT</span><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p>
          <div className="project-meta"><div><span>ANIME</span><strong>{selected.anime}</strong></div><div><span>MUSIC</span><strong>{selected.music}</strong></div><div><span>TECHNIQUES</span><strong>{selected.techniques.join(' · ')}</strong></div></div>
          <div className="modal-actions"><a className="button button-primary" href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>{selected.projectFilesUrl && <a className="button button-secondary" href={selected.projectFilesUrl} target="_blank" rel="noopener noreferrer">{selected.resourceType === 'Paid' ? 'Get project files ↗' : 'Project files ↗'}</a>}</div>
        </div>
      </section>
    </div>}
  </>;
}

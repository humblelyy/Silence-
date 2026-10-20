import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import VideoPlayer from '@/components/VideoPlayer';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};
  const image = `https://i.ytimg.com/vi/${project.youtubeId}/maxresdefault.jpg`;
  return { title: project.title, description: project.description, openGraph: { title: `${project.title} — SILENCE`, description: project.description, images: [image] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <main className="detail-page">
      <Link className="detail-back" href="/#work">← Back to selected work</Link>
      <p className="eyebrow">{project.category} — {project.anime}</p>
      <h1>{project.title}</h1>
      <VideoPlayer videoId={project.youtubeId} title={project.title} youtubeUrl={project.youtubeUrl} />
      <p className="detail-description">{project.description}</p>
      <dl className="meta-list">
        <div><dt>Anime</dt><dd>{project.anime}</dd></div>
        <div><dt>Music</dt><dd>{project.music}</dd></div>
        <div><dt>Techniques</dt><dd>{project.techniques.join(' · ')}</dd></div>
      </dl>
      <a className="button button--primary" href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
      {projects.length > 1 && (
        <nav className="detail-nav" aria-label="More edits">
          <a href={`/projects/${prev.slug}`}><span className="eyebrow">← Previous</span>{prev.title}</a>
          <a href={`/projects/${next.slug}`}><span className="eyebrow" style={{ justifyContent: 'flex-end' }}>Next →</span>{next.title}</a>
        </nav>
      )}
    </main>
  );
}

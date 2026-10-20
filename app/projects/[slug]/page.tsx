import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? { title: project.title, description: project.description, openGraph: { title: `${project.title} — SILENCE`, description: project.description, images: ['/images/silence-banner.jpg'] } } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main className="detail-page"><a className="detail-back" href="/#work">← Back to selected work</a><p className="eyebrow">{project.category} / PROJECT</p><h1>{project.title}</h1><div className="detail-video"><iframe title={project.title} src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><p className="detail-description">{project.description}</p><div className="project-meta"><div><span>ANIME</span><strong>{project.anime}</strong></div><div><span>MUSIC</span><strong>{project.music}</strong></div><div><span>TECHNIQUES</span><strong>{project.techniques.join(' · ')}</strong></div></div><a className="button button-primary" href={project.youtubeUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></main>;
}

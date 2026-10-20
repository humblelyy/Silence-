import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  return [{ url: base, changeFrequency: 'weekly', priority: 1 }, ...projects.map(project => ({ url: `${base}/projects/${project.slug}`, changeFrequency: 'monthly' as const, priority: project.featured ? 0.8 : 0.6 }))];
}

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import LoadingIntro from '@/components/LoadingIntro';
import InteractionLayer from '@/components/InteractionLayer';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SILENCE — Anime Editor & Motion Designer', template: '%s | SILENCE' },
  description: 'Explore SILENCE’s anime edits, AMV work, 3D visuals and motion graphics.',
  applicationName: 'SILENCE Portfolio',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'SILENCE', title: 'SILENCE — Anime Editor & Motion Designer', description: 'Anime editing, 3D visuals and motion graphics.', images: [{ url: '/images/silence-banner.jpg', width: 1536, height: 864, alt: 'SILENCE portfolio banner' }] },
  twitter: { card: 'summary_large_image', title: 'SILENCE — Anime Editor & Motion Designer', description: 'Anime editing, 3D visuals and motion graphics.', images: ['/images/silence-banner.jpg'] },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'dark light', themeColor: '#09090d' };

// Apply the saved/system theme before paint to avoid a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem('silence-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body><LoadingIntro /><InteractionLayer />{children}</body></html>;
}

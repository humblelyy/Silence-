export type Project = {
  slug: string;
  title: string;
  category: 'AMV' | '3D / Motion' | 'Featured';
  description: string;
  anime: string;
  music: string;
  techniques: string[];
  youtubeUrl: string;
  youtubeId: string;
  featured: boolean;
  projectFilesUrl?: string;
  resourceType?: 'Free' | 'Paid' | 'Private';
};

// Titles and anime are taken from the public YouTube titles on @silenceamvs.
// Music credits stay "Not specified" until confirmed by the creator.
export const projects: Project[] = [
  {
    slug: 'keep-up-toji', title: 'Keep Up — Toji', category: 'Featured',
    description: 'Toji Fushiguro in a hard-hitting 4K cut from Jujutsu Kaisen season 2 — the most viewed edit on the channel.',
    anime: 'Jujutsu Kaisen S2', music: 'Not specified', techniques: ['AMV Editing', 'After Effects'],
    youtubeUrl: 'https://youtu.be/lm47T73ARgI', youtubeId: 'lm47T73ARgI', featured: true
  },
  {
    slug: 'free-show-marin', title: 'Free Show — Marin Kitagawa', category: 'AMV',
    description: 'A bright, quick 4K edit built around Marin Kitagawa — playful timing and clean beat sync.',
    anime: 'My Dress-Up Darling', music: 'Not specified', techniques: ['Beat Sync', 'Compositing'],
    youtubeUrl: 'https://youtu.be/gkWgpYa5LIM', youtubeId: 'gkWgpYa5LIM', featured: true
  },
  {
    slug: 'id-rather-lie-waguri', title: 'I’d Rather Lie — Waguri Kaoruko', category: 'AMV',
    description: 'A softer, atmospheric 4K edit centred on Waguri Kaoruko, paced around mood rather than impact.',
    anime: 'The Fragrant Flower Blooms with Dignity', music: 'Not specified', techniques: ['Motion Graphics', 'Visual Effects'],
    youtubeUrl: 'https://youtu.be/KBx_7cXsGmM', youtubeId: 'KBx_7cXsGmM', featured: true
  },
  {
    slug: 'catchy-momo-okarun', title: 'Catchy — Momo × Okarun', category: 'AMV',
    description: 'A quick, high-energy Dandadan edit pairing Momo and Okarun.',
    anime: 'Dandadan', music: 'Not specified', techniques: ['AMV Editing', 'Transitions'],
    youtubeUrl: 'https://youtu.be/RGKL7g9Ivxo', youtubeId: 'RGKL7g9Ivxo', featured: false
  }
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/silence.aee' },
  { label: 'YouTube', href: 'https://youtube.com/@silenceamvs' },
  { label: 'Discord', href: 'https://discord.gg/TV2fryB8TY' },
  { label: 'TikTok', href: 'https://tiktok.com/@silencee_amv' },
  { label: 'Kick', href: 'https://kick.com/silenceamv' },
  { label: 'Payhip', href: 'https://payhip.com/Silenceamvs' }
];

/**
 * Hero background loop. Paste ONE link here:
 *  - a direct video file (.mp4 / .webm) — best quality and most reliable autoplay, or
 *  - a YouTube link (youtu.be/… or youtube.com/watch?v=…) — plays muted on loop.
 * Can also be set with NEXT_PUBLIC_HERO_VIDEO_URL.
 */
export const heroVideo = {
  url: process.env.NEXT_PUBLIC_HERO_VIDEO_URL || '/images/hero-video-1080.mp4',
  /** Optional high-res AV1 master, used on large screens whose browser can decode AV1. */
  hiResUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ? '' : '/images/hero-video.mp4',
  poster: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ? '' : '/images/hero-poster.jpg',
  /** Optional start/end (seconds) to loop just the best section of a YouTube video. */
  start: 0,
  end: 0,
};

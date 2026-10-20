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

// Initial showcase content from the links supplied for SILENCE.
// Replace descriptions and project metadata with verified details before public launch.
export const projects: Project[] = [
  {
    slug: 'most-viewed-amv', title: 'Most Viewed Edit', category: 'Featured',
    description: 'A featured SILENCE edit. Watch the full cut and explore more work from the channel.',
    anime: 'Not specified', music: 'Not specified', techniques: ['AMV Editing', 'After Effects'],
    youtubeUrl: 'https://youtu.be/lm47T73ARgI', youtubeId: 'lm47T73ARgI', featured: true
  },
  {
    slug: 'selected-amv-02', title: 'Selected Edit 02', category: 'AMV',
    description: 'A selected AMV from the SILENCE channel. Project-specific credits can be added when confirmed.',
    anime: 'Not specified', music: 'Not specified', techniques: ['Beat Sync', 'Compositing'],
    youtubeUrl: 'https://youtu.be/gkWgpYa5LIM', youtubeId: 'gkWgpYa5LIM', featured: true
  },
  {
    slug: 'selected-amv-03', title: 'Selected Edit 03', category: 'AMV',
    description: 'A second selected cut from the creator’s reference list. Credits are left unlisted until verified.',
    anime: 'Not specified', music: 'Not specified', techniques: ['Motion Graphics', 'Visual Effects'],
    youtubeUrl: 'https://youtu.be/KBx_7cXsGmM', youtubeId: 'KBx_7cXsGmM', featured: true
  },
  {
    slug: 'selected-amv-04', title: 'Selected Edit 04', category: 'AMV',
    description: 'A selected edit from the SILENCE reference list. Open the full video to watch the complete work.',
    anime: 'Not specified', music: 'Not specified', techniques: ['AMV Editing', 'Transitions'],
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

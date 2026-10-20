import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  // Old placeholder slugs from earlier versions keep working.
  async redirects() {
    return [
      ['most-viewed-amv', 'keep-up-toji'], ['selected-amv-02', 'free-show-marin'],
      ['selected-amv-03', 'id-rather-lie-waguri'], ['selected-amv-04', 'catchy-momo-okarun'],
    ].map(([from, to]) => ({ source: `/projects/${from}`, destination: `/projects/${to}`, permanent: true }));
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
      ]
    }];
  }
};
export default nextConfig;

# SILENCE Portfolio — Version 4

A cinematic, responsive portfolio concept for SILENCE, an anime AMV editor and motion designer. This release focuses on a more editorial visual system, live typography effects, interaction feedback, and a more deliberate video-gallery experience.

## What changed in V5

- Single coherent stylesheet (the four stacked V1–V4 override layers were removed) with one violet accent sampled from the profile art, working dark/light themes and no theme flash on load.
- `SplitText` now uses GSAP's SplitText + ScrollTrigger (React Bits `SplitText-JS-CSS` API: `delay`, `duration`, `ease`, `splitType`, `from`, `to`, `threshold`, `rootMargin`, `onLetterAnimationComplete`).
- Reliable video: click-to-play YouTube facade (`VideoPlayer`) instead of autoplaying iframes mounted on scroll/hover; sharp maxres thumbnails with fallback; slow-load fallback link.
- Project modal with prev/next, ←/→/Esc keys, focus trap and focus restore; case pages with the same player and prev/next.
- Real project titles from the channel; old placeholder slugs redirect.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Project content

Edit `lib/projects.ts` to update the currently configured showcase entries. The listed YouTube links are supplied reference videos. Anime/song details are left as `Not specified` until confirmed; do not publish guessed credits.

Thumbnails are fetched from YouTube's public thumbnail endpoint. If a video is private, removed, age-restricted, or unavailable for embedding, its preview may not play; the direct YouTube link remains available when the video itself is accessible. Browser autoplay policies vary, so previews are muted and full playback is opened by user interaction.

## Environment and deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical deployed URL before production deployment. See `.env.example` for the environment template.

## Important implementation status

V4 includes the portfolio frontend and interaction components. The `/admin` route is intentionally a setup notice, not a live upload dashboard. Supabase Auth, database schema/RLS, storage upload workflows, server-side admin limit enforcement, and production security configuration still require a separately configured backend and credentials. Do not treat this prototype as a complete production CMS until those pieces are implemented and tested.

Lint and type-check pass. Embeds were verified to load; in automated/datacenter browsers YouTube may show a "confirm you're not a bot" screen, which does not happen for normal visitors.

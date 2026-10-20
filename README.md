<<<<<<< HEAD
# SILENCE Portfolio — Version 4

A cinematic, responsive portfolio concept for SILENCE, an anime AMV editor and motion designer. This release focuses on a more editorial visual system, live typography effects, interaction feedback, and a more deliberate video-gallery experience.

## What changed in V4

- New cinematic hero composition, editorial typography and animated character reveals (`SplitText`).
- Interactive variable-weight headline (`VariableProximity`) and pointer-reactive warp lettering (`WarpText`).
- CSS-driven elastic 3D-inspired visual study (`ElasticMesh`) and pointer spotlight cards (`SpotlightCard`).
- Scroll reveal behavior, desktop target cursor and subtle click sparks with reduced-motion/touch fallbacks.
- Refined work gallery, project filters, thumbnail-first preview cards, project detail modal, and full-video links.
- Dark/light toggle with system preference used only as the initial default; no Auto option is displayed.
- Refined loading intro, contact icon links, and `Built with intention by Humble` footer attribution.
- Original SILENCE profile and banner assets preserved.

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

The local build and browser playback could not be verified in this environment because package installation could not reach the npm registry. Run `npm install`, `npm run lint`, and `npm run build` locally and review any dependency/security warnings before deploying.
=======
# SILENCE Portfolio
>>>>>>> 715ad45aa76d79fb365b74b5e73e9ca460b4d193

'use client';

import { useEffect, useState } from 'react';

type Props = {
  videoId: string;
  title: string;
  /** Load the iframe immediately (e.g. the modal was opened by a click, which counts as a user gesture). */
  autoLoad?: boolean;
  youtubeUrl: string;
};

/** Picks the sharpest available YouTube thumbnail; YouTube serves a 120px grey placeholder when maxres is missing. */
export function YouTubeThumbnail({ videoId, alt, className = '' }: { videoId: string; alt: string; className?: string }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
  const [failed, setFailed] = useState(false);
  const fallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  if (failed) return <div className={`thumb-fallback ${className}`} aria-hidden="true">S<span>.</span></div>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={e => { if (e.currentTarget.naturalWidth <= 120 && src !== fallback) setSrc(fallback); }}
      onError={() => (src !== fallback ? setSrc(fallback) : setFailed(true))}
    />
  );
}

/**
 * Click-to-play YouTube player ("facade"). Only one real iframe exists at a time and only after
 * intent, which avoids the autoplay-policy failures and heavy network cost of mounting iframes on scroll.
 */
export default function VideoPlayer({ videoId, title, autoLoad = false, youtubeUrl }: Props) {
  const [loaded, setLoaded] = useState(autoLoad);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!loaded || ready) return;
    const t = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(t);
  }, [loaded, ready]);

  const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1', modestbranding: '1', color: 'white' });

  return (
    <div className={`video-player ${loaded ? 'is-loaded' : ''} ${ready ? 'is-ready' : ''}`}>
      <YouTubeThumbnail videoId={videoId} alt="" className="video-player__poster" />
      {!loaded && (
        <button type="button" className="video-player__play" onClick={() => setLoaded(true)} aria-label={`Play ${title}`}>
          <span className="video-player__play-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
          <span className="video-player__play-label">PLAY EDIT</span>
        </button>
      )}
      {loaded && (
        <>
          {!ready && <span className="video-player__spinner" aria-hidden="true" />}
          <iframe
            title={title}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setReady(true)}
          />
          {slow && !ready && (
            <a className="video-player__fallback" href={youtubeUrl} target="_blank" rel="noopener noreferrer">Player is slow to load — watch on YouTube ↗</a>
          )}
        </>
      )}
    </div>
  );
}

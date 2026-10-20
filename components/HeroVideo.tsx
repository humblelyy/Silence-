'use client';

import { useEffect, useRef, useState } from 'react';

function youTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/**
 * Full-bleed muted looping background video. Accepts a direct file URL or a YouTube link.
 * Shows a poster until the video is actually playing, and stays on the poster for reduced motion.
 */
export default function HeroVideo({ url, hiResUrl = '', poster: posterUrl = '', start = 0, end = 0 }: { url: string; hiResUrl?: string; poster?: string; start?: number; end?: number }) {
  const ytId = youTubeId(url);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const [src, setSrc] = useState<string | null>(null);
  const tried = useRef(new Set<string>());
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // Pick a file the browser can actually decode: 4K AV1 on big screens, otherwise 1080p H.264.
    const probe = document.createElement('video');
    const av1 = !!probe.canPlayType('video/mp4; codecs="av01.0.12M.08"');
    const h264 = !!probe.canPlayType('video/mp4; codecs="avc1.640028"');
    const big = window.innerWidth * (window.devicePixelRatio || 1) >= 2200;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const preferHi = hiResUrl && av1 && ((big && !saveData) || !h264);
    setSrc(preferHi ? hiResUrl : url);
  }, [url, hiResUrl]);

  const frame = useRef<HTMLIFrameElement>(null);

  // Only reveal the YouTube layer once the player itself reports "playing" (state 1).
  // If YouTube is blocked, slow or refuses to autoplay, the poster simply stays up.
  useEffect(() => {
    if (!ytId || reduced) return;
    const onMessage = (e: MessageEvent) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        const state = data?.info?.playerState ?? (data?.event === 'onStateChange' ? data.info : undefined);
        if (state === 1) setPlaying(true);
      } catch { /* ignore non-JSON messages */ }
    };
    window.addEventListener('message', onMessage);
    // Ask the player to start sending state events.
    const ping = setInterval(() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hero' }), '*'), 500);
    const stop = setTimeout(() => clearInterval(ping), 15000);
    return () => { window.removeEventListener('message', onMessage); clearInterval(ping); clearTimeout(stop); };
  }, [ytId, reduced]);

  const poster = ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : posterUrl || undefined;
  const params = ytId ? new URLSearchParams({
    autoplay: '1', mute: '1', loop: '1', playlist: ytId, controls: '0', playsinline: '1',
    modestbranding: '1', rel: '0', enablejsapi: '1', disablekb: '1', iv_load_policy: '3', fs: '0',
    ...(start ? { start: String(start) } : {}), ...(end ? { end: String(end) } : {}),
  }) : null;

  return (
    <div className={`hero-video ${playing ? 'is-playing' : ''}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {poster && <img className="hero-video__poster" src={poster} alt="" />}
      {!reduced && ytId && (
        <iframe
          ref={frame}
          className="hero-video__media hero-video__media--yt"
          src={`https://www.youtube-nocookie.com/embed/${ytId}?${params}`}
          title="Background showreel"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
        />
      )}
      {!reduced && !ytId && src && (
        <video
          ref={video}
          className="hero-video__media"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          onError={() => {
            // Try the other encode once; if both fail, the poster stays visible.
            tried.current.add(src);
            const next = [url, hiResUrl].find(u => u && !tried.current.has(u));
            if (next) setSrc(next);
          }}
        />
      )}
      <span className="hero-video__shade" />
    </div>
  );
}

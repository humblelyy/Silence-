'use client';

import { useEffect, useState } from 'react';

export default function LoadingIntro() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      // Keep the intro brief, but wait for the page's load event when possible.
      timeout = setTimeout(() => setReady(true), 850);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    return () => {
      window.removeEventListener('load', finish);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timeout = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timeout);
  }, [ready]);

  if (!visible) return null;

  return (
    <div className={`loading-intro ${ready ? 'is-ready' : ''}`} aria-label="Loading SILENCE portfolio" role="status">
      <div className="loading-white-expansion" aria-hidden="true" />
      <div className="loading-content">
        <div className="profile-frame">
          <span className="profile-ring" aria-hidden="true" />
          {/* The real profile image stays above the expanding white layer. */}
          <img src="/images/silence-profile.jpg" alt="SILENCE profile" className="loading-profile" />
        </div>
        <p className="loading-name">SILENCE</p>
        <p className="loading-caption">ANIME · MOTION · VISUALS</p>
      </div>
    </div>
  );
}

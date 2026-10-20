'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/** Icon-only theme toggle: a sun in light mode, a moon in dark mode. */
export default function ThemeControls() {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'dark' ? 'dark' : 'light');
  }, []);
  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem('silence-theme', next);
  }
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  return (
    <button type="button" className={`theme-icon is-${theme}`} onClick={toggle} aria-label={label} title={label}>
      {/* Sun */}
      <svg className="theme-icon__sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
      </svg>
      {/* Moon */}
      <svg className="theme-icon__moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15.4a.6.6 0 0 0-.7-.8Z" />
      </svg>
    </button>
  );
}

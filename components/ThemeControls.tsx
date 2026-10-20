'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
function systemTheme(): Theme { return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
export default function ThemeControls() {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const saved = window.localStorage.getItem('silence-theme');
    const initial: Theme = saved === 'light' || saved === 'dark' ? saved : systemTheme();
    setTheme(initial); document.documentElement.dataset.theme = initial;
  }, []);
  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next); document.documentElement.dataset.theme = next; window.localStorage.setItem('silence-theme', next);
  }
  return <button type="button" className="theme-switch" onClick={toggle} role="switch" aria-checked={theme === 'dark'} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><span className="theme-switch-icon" aria-hidden="true">{theme === 'dark' ? '☾' : '☼'}</span><span className="theme-switch-track"><span className="theme-switch-thumb" /></span><span className="theme-switch-label">{theme === 'dark' ? 'DARK' : 'LIGHT'}</span></button>;
}

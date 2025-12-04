import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'notes_app_theme';

/**
 * PUBLIC_INTERFACE
 * useTheme manages light/dark theme with localStorage persistence.
 *
 * @returns {{ theme: 'light' | 'dark', toggleTheme: () => void }}
 */
export function useTheme() {
  const [theme, setTheme] = useState('dark');

  // Initialize from localStorage or prefers-color-scheme
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored);
        return;
      }
    } catch {
      // ignore access issues
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  // Keep DOM attribute and localStorage in sync
  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore access issues
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}

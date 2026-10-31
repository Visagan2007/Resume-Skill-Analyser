import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { transitionAppearance } from './appearanceTransition.js';
import { getVisualPreferences } from './visualEffects.js';

const storageKey = 'rsa-theme';

function storedPreference() {
  try {
    const value = window.localStorage.getItem(storageKey);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  const preferenceRef = useRef(storedPreference());
  const selectedThemeRef = useRef(theme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#17111F' : '#F7F4FA');
  }, [theme]);

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (event) => {
      if (!preferenceRef.current) {
        selectedThemeRef.current = event.matches ? 'dark' : 'light';
        const next = selectedThemeRef.current;
        transitionAppearance(() => setTheme(next), { reducedMotion: true });
      }
    };
    const onStorage = (event) => {
      if (event.key !== storageKey && event.key !== null) return;
      preferenceRef.current = storedPreference();
      selectedThemeRef.current = preferenceRef.current || (system.matches ? 'dark' : 'light');
      const next = selectedThemeRef.current;
      transitionAppearance(() => setTheme(next), { reducedMotion: true });
    };
    system.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    return () => {
      system.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const selectTheme = (next) => {
    if (next !== 'light' && next !== 'dark') return;
    if (next === selectedThemeRef.current && preferenceRef.current === next) return;
    selectedThemeRef.current = next;
    preferenceRef.current = next;
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Keep the selected theme for this visit if persistence is blocked.
    }
    transitionAppearance(() => setTheme(next), {
      reducedMotion: getVisualPreferences().reducedMotion,
    });
  };

  return { theme, setTheme: selectTheme };
}

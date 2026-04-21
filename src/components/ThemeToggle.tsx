'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme-preference';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(THEME_KEY) as Theme | null;
  } catch {
    return null;
  }
}

function saveTheme(theme: Theme) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage errors (private mode / blocked storage).
  }
}

function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const current = document.documentElement?.getAttribute('data-theme');
  return current === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement?.setAttribute('data-theme', theme);
  }
  saveTheme(theme);
}

export default function ThemeToggle() {
  useEffect(() => {
    const initialTheme = getStoredTheme() ?? getSystemTheme();
    applyTheme(initialTheme);
  }, []);

  const handleToggle = () => {
    const nextTheme: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleToggle}
      aria-label="Toggle color mode"
      title="Toggle color mode"
    >
      <span className={styles.track} aria-hidden>
        <span className={styles.thumb}>
          <span className={`${styles.iconWrap} ${styles.sunIcon}`}>
            <Sun size={14} className={styles.icon} />
          </span>
          <span className={`${styles.iconWrap} ${styles.moonIcon}`}>
            <Moon size={14} className={styles.icon} />
          </span>
        </span>
      </span>
    </button>
  );
}

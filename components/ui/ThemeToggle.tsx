'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-9 h-9 rounded-lg border border-border-subtle bg-bg-secondary flex items-center justify-center opacity-60',
          className
        )}
        aria-hidden="true"
      >
        <span className="w-4 h-4 rounded-full bg-border-strong animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode (warm paper)' : 'Switch to dark mode (near black)'}
      className={cn(
        'relative w-9 h-9 rounded-lg border border-border-subtle bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group',
        className
      )}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:-rotate-12 transition-transform duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { siteConfig } from '@/content/site';
import {
  Terminal,
  Search,
  Home,
  Layers,
  User,
  Mail,
  Download,
  Sun,
  Moon,
  Copy,
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'External';
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle with Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const closePalette = useCallback(() => {
    setIsOpen(false);
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      label: 'Go to Home',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-accent" />,
      shortcut: 'H',
      onSelect: () => {
        router.push('/');
        closePalette();
      },
    },
    {
      id: 'nav-projects',
      label: 'Browse Projects & Case Studies',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-accent" />,
      shortcut: 'P',
      onSelect: () => {
        router.push('/projects');
        closePalette();
      },
    },
    {
      id: 'nav-about',
      label: 'Read About & Sysadmin Journey',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-accent" />,
      shortcut: 'A',
      onSelect: () => {
        router.push('/about');
        closePalette();
      },
    },
    {
      id: 'nav-contact',
      label: 'Contact & Send Message',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-accent" />,
      shortcut: 'C',
      onSelect: () => {
        router.push('/contact');
        closePalette();
      },
    },
    {
      id: 'action-theme',
      label: `Switch to ${resolvedTheme === 'dark' ? 'Light Mode (Warm Paper)' : 'Dark Mode (Near Black)'}`,
      category: 'Actions',
      icon:
        resolvedTheme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-sky-400" />
        ),
      shortcut: 'T',
      onSelect: () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        closePalette();
      },
    },
    {
      id: 'action-cv',
      label: 'Download Resume (PDF)',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      shortcut: 'D',
      onSelect: () => {
        const link = document.createElement('a');
        link.href = siteConfig.cvPath;
        link.download = 'Oppong_Andrews_Resume.pdf';
        link.click();
        closePalette();
      },
    },
    {
      id: 'action-email',
      label: copied ? 'Email Copied!' : `Copy Email (${siteConfig.email})`,
      category: 'Actions',
      icon: copied ? (
        <Check className="w-4 h-4 text-accent" />
      ) : (
        <Copy className="w-4 h-4 text-accent" />
      ),
      shortcut: 'E',
      onSelect: () => {
        navigator.clipboard.writeText(siteConfig.email);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          closePalette();
        }, 800);
      },
    },
    {
      id: 'ext-github',
      label: 'Visit GitHub Profile (@An-Drew5)',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-text-muted" />,
      onSelect: () => {
        window.open(siteConfig.github, '_blank', 'noopener,noreferrer');
        closePalette();
      },
    },
    {
      id: 'ext-linkedin',
      label: 'Visit LinkedIn Profile',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-text-muted" />,
      onSelect: () => {
        window.open(siteConfig.linkedin, '_blank', 'noopener,noreferrer');
        closePalette();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md transition-opacity"
        onClick={closePalette}
        aria-hidden="true"
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl rounded-xl border border-border-strong bg-bg-secondary shadow-2xl overflow-hidden z-10 font-mono text-xs animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-border-subtle text-text-muted text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-text-primary font-medium">terminal-exec: command-palette</span>
          </div>
          <button
            onClick={closePalette}
            className="p-1 rounded hover:bg-bg-secondary text-text-muted hover:text-text-primary"
            aria-label="Close command palette"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-border-subtle bg-bg-secondary">
          <Search className="w-4 h-4 text-accent mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search (e.g. projects, theme, cv)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none text-xs"
          />
          <kbd className="px-2 py-0.5 rounded bg-bg-tertiary border border-border-subtle text-[10px] text-text-muted uppercase">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors',
                    isSelected
                      ? 'bg-accent-muted text-accent font-semibold border border-accent/30'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/60 border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="text-xs">{cmd.label}</span>
                  </div>

                  {cmd.shortcut && (
                    <kbd className="px-1.5 py-0.5 rounded bg-bg-tertiary border border-border-subtle text-[10px] text-text-muted">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-text-muted">
              <Terminal className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <p>No matching commands found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="px-4 py-2 bg-bg-tertiary border-t border-border-subtle flex items-center justify-between text-[10px] text-text-muted">
          <span>Use ↑↓ arrows to navigate, Enter to execute</span>
          <span className="text-accent font-semibold">RHEL DevOps Portfolio</span>
        </div>
      </div>
    </div>
  );
}

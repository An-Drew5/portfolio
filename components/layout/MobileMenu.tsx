'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NavItem } from '@/content/site';
import { X, Download, Terminal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPath: string;
  cvPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  currentPath,
  cvPath,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trap focus and handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="relative w-full max-w-sm h-full bg-bg-secondary border-l border-border-strong p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="text-text-primary font-semibold">~/menu</span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg border border-border-subtle bg-bg-tertiary hover:bg-bg-primary flex items-center justify-center text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close navigation menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navItems.map((item, index) => {
              const isActive =
                item.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg font-mono text-sm transition-colors border',
                    isActive
                      ? 'bg-accent-subtle text-accent border-accent/30 font-semibold'
                      : 'text-text-secondary border-border-subtle hover:text-text-primary hover:bg-bg-tertiary'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">0{index + 1}.</span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-border-subtle space-y-4 font-mono">
          <Button
            variant="primary"
            size="md"
            href={cvPath}
            download="Oppong_Andrews_Resume.pdf"
            className="w-full text-xs justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume (PDF)
          </Button>

          <div className="text-[11px] text-text-muted text-center pt-2">
            <span>Location: Kumasi, Ghana (UTC+0)</span>
            <div className="text-accent mt-0.5">RHCSA & RHEL Candidate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

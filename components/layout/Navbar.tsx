'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Terminal, Download, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle py-3 shadow-sm'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Terminal Prompt */}
          <Link
            href="/"
            className="flex items-center gap-2 group font-mono text-sm tracking-tight text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-1.5 py-1"
            aria-label="Andrews Oppong — Home"
          >
            <span className="w-6 h-6 rounded bg-accent-muted border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-text-inverse transition-colors">
              <Terminal className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
              andrews
            </span>
            <span className="text-text-muted">@</span>
            <span className="text-accent font-semibold">rhel:~</span>
            <span className="inline-block w-1.5 h-3.5 bg-accent animate-blink" aria-hidden="true" />
          </Link>

          {/* Desktop Nav Links: Home · Projects · About · Contact */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  id={item.id}
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-md transition-colors duration-200 tracking-wide',
                    isActive
                      ? 'text-accent font-semibold bg-accent-subtle border border-accent/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  )}
                >
                  {isActive && (
                    <span className="text-accent mr-1 opacity-70">&gt;</span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Download CV Button */}
            <Button
              variant="secondary"
              size="sm"
              href={siteConfig.cvPath}
              download="Oppong_Andrews_Resume.pdf"
              className="hidden sm:inline-flex text-xs font-mono"
              prefixSymbol=""
              id="header-cv-download-btn"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-accent" />
              Download CV
            </Button>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg border border-border-subtle bg-bg-secondary hover:bg-bg-tertiary flex items-center justify-center text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Slide-in Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={siteConfig.navItems}
        currentPath={pathname}
        cvPath={siteConfig.cvPath}
      />
    </>
  );
}

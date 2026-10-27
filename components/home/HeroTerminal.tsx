'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { siteConfig } from '@/content/site';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Terminal, RefreshCw, Check } from 'lucide-react';
import Link from 'next/link';

export function HeroTerminal() {
  const [typedCommand1, setTypedCommand1] = useState('');
  const [showOutput1, setShowOutput1] = useState(false);
  const [typedCommand2, setTypedCommand2] = useState('');
  const [showOutput2, setShowOutput2] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const fullCmd1 = siteConfig.heroTerminal.command1; // whoami
  const fullOutput1 = siteConfig.heroTerminal.output1; // andrews-oppong — full-stack engineer → devops
  const fullCmd2 = siteConfig.heroTerminal.command2; // cat currently.txt
  const fullOutput2 = siteConfig.heroTerminal.output2; // Studying for RHCSA. Building a hardened, automated deployment of Arrow on RHEL.

  const skipAnimation = useCallback(() => {
    setTypedCommand1(fullCmd1);
    setShowOutput1(true);
    setTypedCommand2(fullCmd2);
    setShowOutput2(true);
    setIsDone(true);
    setIsSkipped(true);
    try {
      sessionStorage.setItem('hasSeenHeroTyping', 'true');
    } catch {
      // ignore
    }
  }, [fullCmd1, fullCmd2]);

  useEffect(() => {
    // Check reduced motion or previous session visit
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeen =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('hasSeenHeroTyping') === 'true';

    if (prefersReducedMotion || hasSeen) {
      skipAnimation();
      return;
    }

    let timer: NodeJS.Timeout;

    // Type first command
    let i = 0;
    const typeCmd1 = () => {
      if (i <= fullCmd1.length) {
        setTypedCommand1(fullCmd1.slice(0, i));
        i++;
        timer = setTimeout(typeCmd1, 45 + Math.random() * 25);
      } else {
        setShowOutput1(true);
        timer = setTimeout(startCmd2, 280);
      }
    };

    let j = 0;
    const startCmd2 = () => {
      const typeCmd2 = () => {
        if (j <= fullCmd2.length) {
          setTypedCommand2(fullCmd2.slice(0, j));
          j++;
          timer = setTimeout(typeCmd2, 40 + Math.random() * 20);
        } else {
          setShowOutput2(true);
          setIsDone(true);
          try {
            sessionStorage.setItem('hasSeenHeroTyping', 'true');
          } catch {
            // ignore
          }
        }
      };
      typeCmd2();
    };

    timer = setTimeout(typeCmd1, 350);

    return () => clearTimeout(timer);
  }, [fullCmd1, fullCmd2, skipAnimation]);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Decorative background aura */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-accent-muted rounded-full blur-[110px] pointer-events-none -z-10 opacity-40 dark:opacity-20"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Heading and Positioning */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-strong bg-bg-secondary text-xs font-mono text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-text-primary font-medium">Available for Opportunities</span>
            <span className="text-border-strong">/</span>
            <span className="text-accent font-semibold">RHEL & DevOps</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
            Engineering reliable systems from{' '}
            <span className="text-accent underline decoration-accent/40 decoration-wavy underline-offset-8">
              full-stack SaaS
            </span>{' '}
            to hardened Linux servers.
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal max-w-2xl">
            {siteConfig.positioning}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              href="/projects"
              suffixSymbol="→"
              id="hero-view-projects-btn"
            >
              View projects
            </Button>

            <Button
              variant="secondary"
              size="md"
              href="/contact"
              id="hero-contact-btn"
            >
              Get in touch
            </Button>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs text-text-muted hover:text-text-primary bg-bg-secondary/60 hover:bg-bg-tertiary border border-border-subtle transition-colors"
              title="Copy email to clipboard"
              aria-label="Copy Andrews Oppong's email address"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Terminal className="w-3.5 h-3.5 text-text-muted" />
                  <span>{siteConfig.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Hero Terminal */}
        <div className="lg:col-span-5">
          <div
            onClick={!isDone ? skipAnimation : undefined}
            onKeyDown={(e) => {
              if (!isDone && (e.key === 'Enter' || e.key === ' ')) {
                skipAnimation();
              }
            }}
            tabIndex={0}
            role="region"
            aria-label="Interactive Terminal Hero"
            className="cursor-pointer group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            title={!isDone ? 'Click or press Enter to skip typing animation' : undefined}
          >
            <TerminalWindow
              title="andrews@rhel-box:~"
              badge="bash 5.2"
              className="border-border-strong/90 shadow-2xl"
              bodyClassName="min-h-[220px] flex flex-col justify-between text-xs sm:text-sm font-mono select-text"
            >
              <div className="space-y-4">
                {/* Command 1: whoami */}
                <div>
                  <div className="flex items-center text-text-primary">
                    <span className="text-accent font-semibold mr-2">$</span>
                    <span className="text-text-primary font-medium">
                      {typedCommand1}
                    </span>
                    {!showOutput1 && (
                      <span className="inline-block w-2 h-4 bg-accent ml-1 animate-blink" />
                    )}
                  </div>
                  {showOutput1 && (
                    <div className="mt-1.5 text-emerald-400 pl-4 border-l-2 border-accent/40 font-medium">
                      {fullOutput1}
                    </div>
                  )}
                </div>

                {/* Command 2: cat currently.txt */}
                {showOutput1 && (
                  <div>
                    <div className="flex items-center text-text-primary">
                      <span className="text-accent font-semibold mr-2">$</span>
                      <span className="text-text-primary font-medium">
                        {typedCommand2}
                      </span>
                      {!showOutput2 && (
                        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-blink" />
                      )}
                    </div>
                    {showOutput2 && (
                      <div className="mt-1.5 text-text-secondary pl-4 border-l-2 border-border-strong text-xs leading-relaxed">
                        {fullOutput2}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terminal Footer Indicator */}
              <div className="pt-4 mt-6 border-t border-border-subtle flex items-center justify-between text-[11px] text-text-muted select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>SELinux: enforcing</span>
                </span>
                {!isDone ? (
                  <span className="text-text-muted hover:text-accent flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Click to skip</span>
                  </span>
                ) : (
                  <span className="text-accent">[ok]</span>
                )}
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { Github, Linkedin, Mail, Terminal, Activity } from 'lucide-react';

export function Footer() {
  const [kumasiTime, setKumasiTime] = useState<string>('');
  const [uptimeDays, setUptimeDays] = useState<number>(42);
  const [uptimeHours, setUptimeHours] = useState<number>(18);
  const [uptimeMins, setUptimeMins] = useState<number>(37);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: siteConfig.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setKumasiTime(formatter.format(now));
      } catch {
        setKumasiTime('17:45:00 UTC');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="mt-24 border-t border-border-subtle bg-bg-secondary/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Terminal Status Ribbon */}
        <div className="rounded-lg border border-border-subtle bg-bg-tertiary/60 p-4 mb-8 font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-text-primary font-semibold">sysctl:</span>
              <span className="text-emerald-400">all units active (running)</span>
            </div>
            <span className="hidden sm:inline text-border-strong">|</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="text-text-muted">uptime:</span>
              <span className="text-text-primary font-medium">
                {uptimeDays}d {uptimeHours}h {uptimeMins}m, load average: 0.12, 0.08, 0.05
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-text-muted">Kumasi, GH (Africa/Accra):</span>
            <span className="px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-accent font-semibold">
              {kumasiTime || '--:--:-- GMT'}
            </span>
          </div>
        </div>

        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm text-text-primary">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="font-semibold">{siteConfig.name}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Full-stack engineer pivoting toward DevOps & Linux systems administration on RHEL.
              Studying for RHCSA.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Navigation
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Socials */}
          <div className="space-y-2 md:text-right">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Network & Connect
            </div>
            <div className="flex md:justify-end items-center gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-8 h-8 rounded-md border border-border-subtle bg-bg-secondary hover:bg-bg-tertiary hover:border-accent text-text-secondary hover:text-accent transition-colors flex items-center justify-center"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-8 h-8 rounded-md border border-border-subtle bg-bg-secondary hover:bg-bg-tertiary hover:border-accent text-text-secondary hover:text-accent transition-colors flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Send Email"
                className="w-8 h-8 rounded-md border border-border-subtle bg-bg-secondary hover:bg-bg-tertiary hover:border-accent text-text-secondary hover:text-accent transition-colors flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright in terminal comment style */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
          <div>
            <span>{`/* © ${new Date().getFullYear()} Andrews Oppong. Built with Next.js & RHEL engineering precision. */`}</span>
          </div>
          <div>
            <span className="text-text-muted">Deployed to Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use strict';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/content/site';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { ArrowRight, Server, Shield, Terminal, Cpu } from 'lucide-react';

export function CurrentlyBlock() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
      <Card
        chrome
        title="systemctl status arrow-ops.service"
        badge={<StatusPill status="in-progress" prefix="state" />}
        className="border-accent/30 bg-bg-secondary/90 shadow-lg"
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <Terminal className="w-3.5 h-3.5" />
                <span>~/active-focus</span>
                <span className="text-border-strong">•</span>
                <span className="text-text-muted">RHEL 9 Baseline Hardening</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                {siteConfig.currently.heading}
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {siteConfig.currently.text}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-text-secondary">
                <span className="px-2.5 py-1 rounded bg-bg-tertiary border border-border-subtle flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-accent" />
                  <span>RHCSA Exam Preparation</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-bg-tertiary border border-border-subtle flex items-center gap-1.5">
                  <Server className="w-3 h-3 text-emerald-400" />
                  <span>RHEL 9 (SELinux Enforcing)</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-bg-tertiary border border-border-subtle flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  <span>systemd Service Sandboxing</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href={`/projects/${siteConfig.currently.projectSlug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold bg-accent text-text-inverse hover:bg-accent-hover transition-colors shadow-sm"
              >
                <span>View RHEL Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-bg-primary border border-border-subtle transition-colors"
              >
                <span>Browse all phases (7)</span>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

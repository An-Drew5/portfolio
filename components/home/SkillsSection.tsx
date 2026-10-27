'use strict';

import React from 'react';
import { skillGroups } from '@/content/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Terminal, ShieldAlert, CheckCircle2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SkillsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
      <SectionHeading
        prompt="~/skills"
        tag="competencies"
        title="Technical Arsenal & System Capabilities"
        description="Core competencies grouped by domain, with a visually prioritized focus on enterprise Linux administration and RHCSA mastery."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => {
          const isLearning = group.isLearning;

          return (
            <Card
              key={group.category}
              chrome
              title={group.command}
              badge={
                isLearning ? (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>RHCSA Track</span>
                  </span>
                ) : undefined
              }
              className={cn(
                'h-full flex flex-col',
                isLearning
                  ? 'border-accent/40 bg-gradient-to-b from-accent/5 to-bg-secondary shadow-md'
                  : 'bg-bg-secondary/70'
              )}
            >
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={cn(
                      'text-sm font-mono font-bold tracking-tight mb-4 flex items-center gap-2',
                      isLearning ? 'text-accent' : 'text-text-primary'
                    )}
                  >
                    <span>{group.category}</span>
                  </h3>

                  <ul className="space-y-2">
                    {group.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className={cn(
                          'flex items-center justify-between text-xs font-mono py-1 px-2 rounded transition-colors',
                          isLearning
                            ? 'bg-bg-tertiary/80 text-text-primary border border-border-subtle hover:border-accent/30'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/40'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isLearning ? 'bg-accent shadow-[0_0_6px_#4ade80]' : 'bg-border-strong'
                            )}
                          />
                          <span>{skill.name}</span>
                        </span>

                        {skill.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent-muted text-accent border border-accent/20">
                            {skill.badge}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {isLearning && (
                  <div className="mt-4 pt-3 border-t border-accent/20 text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>RHEL 9, SELinux, and Ansible actively in use</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

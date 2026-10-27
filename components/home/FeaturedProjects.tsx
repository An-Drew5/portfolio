'use strict';

import React from 'react';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink, ArrowRight, Github, Terminal, Layers } from 'lucide-react';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <SectionHeading
          prompt="~/projects"
          tag="featured"
          title="Engineered Systems & Production Projects"
          description="Real-world multi-tenant software, enterprise RHEL Linux self-hosting, and automated CI/CD pipelines."
          className="mb-0"
        />
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline decoration-accent/50 underline-offset-4 self-start sm:self-auto shrink-0"
        >
          <span>View all projects ({projects.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, idx) => (
          <Card
            key={project.slug}
            chrome
            title={`proj-0${idx + 1} // ${project.slug}`}
            badge={<StatusPill status={project.status} />}
            className="flex flex-col h-full bg-bg-secondary/70 hover:border-border-strong transition-all duration-300"
          >
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono text-accent mb-1.5">
                  {project.category}
                </div>

                <h3 className="text-lg font-bold text-text-primary tracking-tight group-hover:text-accent transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Key decisions preview */}
                <div className="mt-4 pt-3 border-t border-border-subtle">
                  <div className="text-[10px] font-mono uppercase text-text-muted mb-2 tracking-wider">
                    Key Decisions & Architecture:
                  </div>
                  <ul className="space-y-1.5 text-xs text-text-secondary font-sans">
                    {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-accent text-xs font-mono select-none mt-0.5">›</span>
                        <span className="line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom stack and links */}
              <div className="mt-6 pt-4 border-t border-border-subtle">
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-mono text-[10px] bg-bg-tertiary text-text-muted border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded font-mono text-[10px] text-text-muted">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between font-mono text-xs pt-1">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-accent font-medium hover:underline underline-offset-4"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary p-1 rounded"
                        title="Live application"
                        aria-label={`Visit live site for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary p-1 rounded"
                        title="Source repository"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

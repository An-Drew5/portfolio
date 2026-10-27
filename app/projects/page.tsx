import { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExternalLink, Github, ArrowRight, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects & Case Studies',
  description:
    'Mini case studies in full-stack engineering, hardened RHEL systems administration, and automated CI/CD pipelines by Andrews Oppong.',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionHeading
        prompt="~/projects"
        tag="case-studies"
        title="Engineering Projects & Operational Infrastructure"
        description="Detailed breakdowns of architecture, problem-solving, real engineering roles, and production deployment across full-stack applications and enterprise Linux servers."
      />

      <div className="space-y-10">
        {projects.map((project, idx) => (
          <Card
            key={project.slug}
            chrome
            title={`proj-0${idx + 1} :: ${project.title}`}
            badge={<StatusPill status={project.status} />}
            className="bg-bg-secondary/70 hover:border-border-strong transition-all duration-300"
          >
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side: Context & Decisions */}
                <div className="lg:col-span-8 space-y-5">
                  <div>
                    <div className="font-mono text-xs text-accent mb-1">
                      {project.category}
                      {project.teamSize && ` • ${project.teamSize}`}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h2>
                    <div className="mt-1 font-mono text-xs text-text-muted">
                      Role: <span className="text-text-primary font-medium">{project.role}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-1.5">
                      The Challenge / Problem
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                      Key Decisions & Architectural Solutions
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                      {project.keyDecisions.map((decision, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-accent font-mono select-none mt-0.5">›</span>
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights/Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {project.highlights.map((highlight, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-1 rounded font-mono text-xs bg-bg-tertiary text-text-secondary border border-border-subtle"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Stack, Status & CTA links */}
                <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8 space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded font-mono text-xs bg-bg-tertiary text-text-primary border border-border-subtle"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-text-muted block text-[11px] uppercase tracking-wider mb-1">
                        Deployment Status
                      </span>
                      <p className="text-text-secondary font-sans text-xs">
                        {project.resultStatus}
                      </p>
                    </div>

                    {project.phases && (
                      <div className="p-3 rounded bg-bg-tertiary/70 border border-accent/20">
                        <span className="text-accent font-semibold flex items-center gap-1.5 mb-1">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>7-Phase RHEL Tracker</span>
                        </span>
                        <p className="text-[11px] text-text-muted">
                          Phase 1 in progress. 6 phases planned.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs font-semibold bg-accent text-text-inverse hover:bg-accent-hover transition-colors shadow-sm"
                    >
                      <span>Read Deep-Dive Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs bg-bg-tertiary hover:bg-bg-primary text-text-primary border border-border-subtle transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-accent" />
                          <span>Live Site</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs bg-bg-tertiary hover:bg-bg-primary text-text-primary border border-border-subtle transition-colors"
                        >
                          <Github className="w-3.5 h-3.5 text-accent" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

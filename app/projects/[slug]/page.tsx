import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Terminal,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  Server,
  FileCode,
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Case Study`,
    description: project.shortDescription,
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>cd ../projects</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          <span className="font-mono text-xs text-accent px-2 py-0.5 rounded bg-accent-muted border border-accent/20">
            {project.category}
          </span>
          {project.teamSize && (
            <span className="font-mono text-xs text-text-muted">
              Team: {project.teamSize}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Live / Code Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              external
              prefixSymbol="↗"
            >
              Visit Live Application
            </Button>
          )}

          {project.githubUrl && (
            <Button
              variant="secondary"
              size="sm"
              href={project.githubUrl}
              external
              prefixSymbol="gh"
            >
              View GitHub Repository
            </Button>
          )}
        </div>
      </div>

      {/* Architecture Diagram / Screenshot Placeholder */}
      <div className="mb-12">
        <Card
          chrome
          title={`architecture-spec :: ${project.slug}`}
          badge={<span className="font-mono text-[10px] text-text-muted">Spec v1.2</span>}
          className="bg-bg-secondary/90 border-border-strong overflow-hidden"
        >
          <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-bg-tertiary/40 to-bg-secondary flex flex-col items-center justify-center min-h-[220px]">
            <div className="w-12 h-12 rounded-xl bg-accent-muted border border-accent/30 flex items-center justify-center text-accent mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-mono text-sm font-semibold text-text-primary mb-2">
              Architecture & System Topology
            </h4>
            <p className="font-mono text-xs text-text-secondary max-w-xl leading-relaxed">
              {project.archDiagramPlaceholder ||
                `Production topology: Client -> Edge Ingress -> Next.js / Express -> PostgreSQL with isolated schemas.`}
            </p>
          </div>
        </Card>
      </div>

      {/* Case Study Details Grid */}
      <div className="space-y-10">
        {/* The Problem & Context */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // THE CHALLENGE</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Problem Statement & Scope</h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* Role & Engineering Ownership */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // MY ROLE & RESPONSIBILITIES</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Engineering Ownership</h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {project.role}. {project.teamSize ? `Collaborated within a ${project.teamSize}.` : 'Led end-to-end implementation independently.'}
          </p>
        </section>

        {/* Key Decisions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // ARCHITECTURAL DECISIONS</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Key Decisions & Rationale</h2>
          <div className="grid grid-cols-1 gap-3">
            {project.keyDecisions.map((decision, dIdx) => (
              <div
                key={dIdx}
                className="p-4 rounded-lg bg-bg-secondary/70 border border-border-subtle flex items-start gap-3"
              >
                <span className="font-mono text-xs text-accent mt-0.5 font-bold">
                  [{dIdx + 1}]
                </span>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {decision}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7-Phase Interactive Progress Tracker for Arrow DevOps on RHEL */}
        {project.phases && project.phases.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border-subtle">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-accent">
                  <Server className="w-3.5 h-3.5" />
                  <span>04 // RHEL OPERATIONAL ROADMAP</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary">
                  7-Phase Hardened Deployment Tracker
                </h2>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs text-text-muted">
                All phases planned or in-progress
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              This interactive roadmap outlines each phase to transition Arrow from development to an
              enterprise-grade, hardened self-hosted service on Red Hat Enterprise Linux.
            </p>

            <div className="space-y-3 mt-4">
              {project.phases.map((phase) => (
                <div
                  key={phase.number}
                  className={`p-4 rounded-lg border transition-colors ${
                    phase.status === 'in-progress'
                      ? 'bg-bg-secondary border-accent/40 shadow-sm'
                      : 'bg-bg-secondary/40 border-border-subtle opacity-90'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-accent">Phase {phase.number}:</span>
                        <span className="font-semibold text-text-primary">{phase.title}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed pl-5">
                        {phase.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <StatusPill status={phase.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-bg-tertiary/70 border border-border-subtle font-mono text-xs text-text-muted flex items-start gap-2">
              <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>
                <strong>RHCSA Candidate Disclosure:</strong> All infrastructure tasks adhere strictly to Red Hat Enterprise Linux (RHEL 9) best practices. The certification is currently in active study preparation.
              </span>
            </div>
          </section>
        )}

        {/* Technology Stack Grid */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Terminal className="w-3.5 h-3.5" />
            <span>05 // STACK & TOOLING</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Technologies Used</h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg font-mono text-xs bg-bg-secondary text-text-primary border border-border-subtle hover:border-accent/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Status / Results */}
        <section className="space-y-3 pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // RESULT & CURRENT STATUS</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary">Outcome & Deployment Status</h2>
          <div className="p-4 rounded-lg bg-bg-secondary border border-border-strong font-sans text-sm text-text-secondary leading-relaxed">
            {project.resultStatus}
          </div>
        </section>
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-border-subtle flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline"
        >
          <span>Discuss this project</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}

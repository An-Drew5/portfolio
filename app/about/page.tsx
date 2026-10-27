import { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { experiences } from '@/content/experience';
import { skillGroups } from '@/content/skills';
import { ProfilePhoto } from '@/components/ui/ProfilePhoto';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Download,
  Terminal,
  Server,
  ShieldCheck,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Andrews Oppong',
  description:
    'Full-stack engineer pivoting toward DevOps and Linux systems administration (RHCSA candidate) on RHEL. Background in multi-tenant SaaS, CI/CD, and IT infrastructure.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionHeading
        prompt="~/about"
        tag="bio & history"
        title="Full-Stack Engineer Pivoting to Linux DevOps"
        description="A bridge between writing dependable application software and managing enterprise Red Hat Enterprise Linux infrastructure."
      />

      {/* Hero Bio Section with Photo & Story */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-20">
        {/* Photo Container */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4">
          <ProfilePhoto size="lg" />
          <div className="font-mono text-xs text-text-muted text-center md:text-left space-y-1">
            <div className="text-text-primary font-semibold">{siteConfig.name}</div>
            <div>{siteConfig.location}</div>
            <div className="text-accent flex items-center justify-center md:justify-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studying for RHCSA</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            href={siteConfig.cvPath}
            download="Oppong_Andrews_Resume.pdf"
            className="w-full max-w-[256px] text-xs font-mono justify-center"
            id="about-cv-download-btn"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-accent" />
            Download Resume (PDF)
          </Button>
        </div>

        {/* Narrative / Personal Story */}
        <div className="md:col-span-8 space-y-5 text-sm sm:text-base text-text-secondary leading-relaxed">
          <Card
            chrome
            title="cat personal_journey.md"
            className="p-6 bg-bg-secondary/70 border-border-strong space-y-4 font-sans"
          >
            <p>
              Hello! I'm <strong>Andrews Oppong</strong>, a software engineer based in Kumasi, Ghana.
              I started my journey building multi-tenant SaaS applications—such as <em>Arrow</em> (a school management ERP)
              and <em>Smart Study</em> (an AI exam preparation platform). Through these projects, I discovered that what
              truly excites me isn't just writing application logic; it's the operational machinery that keeps code alive,
              isolated, and resilient in production.
            </p>

            <p>
              My early experience serving as an <strong>Information Systems Assistant at the Ghana Cocoa Board (COCOBOD)</strong>{' '}
              grounded me in practical IT operations: maintaining hardware, troubleshooting network outages, managing user permissions,
              and appreciating the criticality of uptime. Later, while leading CI/CD for cross-functional teams at Amalitech—where I
              designed 5 independent path-filtered GitHub Actions pipelines across polyglot microservices—the shift became clear:
              I wanted to own the full delivery and runtime lifecycle.
            </p>

            <p>
              Today, I am deliberately focusing my engineering path toward <strong>DevOps and Linux systems administration</strong>.
              I am actively preparing for the <strong>Red Hat Certified System Administrator (RHCSA)</strong> exam, deploying real workloads
              on <strong>Red Hat Enterprise Linux (RHEL 9)</strong> with strict SELinux enforcement, systemd service sandboxing, firewalld packet
              rules, and automated Ansible provisioning.
            </p>

            <div className="pt-2 font-mono text-xs text-accent flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>{`/* Currently open to DevOps, Cloud, and Systems Engineering roles. */`}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Terminal Log Style Experience Timeline */}
      <section className="mb-20">
        <SectionHeading
          prompt="~/experience"
          tag="systemctl log"
          title="Career Journey & Operational Record"
          description="A verifiable record of software engineering ownership, CI/CD pipeline automation, and enterprise IT infrastructure support."
        />

        <div className="space-y-6">
          {experiences.map((item, idx) => (
            <Card
              key={idx}
              chrome
              title={item.commandLabel}
              badge={
                <span className="font-mono text-xs text-text-muted">
                  {item.period}
                </span>
              }
              className={`bg-bg-secondary/70 transition-all ${
                item.isSysadminAdjacent ? 'border-accent/40 bg-accent-subtle/10' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">
                    {item.role}
                  </h3>
                  <div className="font-mono text-xs text-accent font-semibold">
                    {item.organization} • {item.location}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider">
                    Key Deliverables & Responsibilities:
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-accent font-mono select-none mt-0.5">›</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-subtle">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded font-mono text-[11px] bg-bg-tertiary text-text-muted border border-border-subtle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Grouped Skills Matrix on About Page */}
      <section className="mb-20">
        <SectionHeading
          prompt="~/stack"
          tag="profile"
          title="Technical Competencies"
          description="Technologies and operational practices verified through personal projects and professional internships."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <Card
              key={group.category}
              chrome
              title={group.command}
              className={group.isLearning ? 'border-accent/40' : undefined}
            >
              <div className="p-5">
                <h3 className="font-mono text-sm font-bold text-text-primary mb-3 flex items-center justify-between">
                  <span>{group.category}</span>
                  {group.isLearning && (
                    <span className="text-[10px] text-emerald-400 font-normal">Active Focus</span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded font-mono text-xs bg-bg-tertiary text-text-secondary border border-border-subtle"
                    >
                      {skill.name}
                      {skill.badge && ` (${skill.badge})`}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA to Contact */}
      <div className="p-6 rounded-lg border border-border-strong bg-bg-secondary text-center space-y-4">
        <h3 className="text-lg font-bold text-text-primary">
          Interested in my engineering journey or discussing a role?
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
          I am eager to contribute to forward-thinking engineering teams requiring solid full-stack capabilities,
          robust CI/CD, and deliberate Linux systems engineering.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Button variant="primary" size="md" href="/contact" suffixSymbol="→">
            Send a Message
          </Button>
          <Button
            variant="secondary"
            size="md"
            href={siteConfig.cvPath}
            download="Oppong_Andrews_Resume.pdf"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download CV
          </Button>
        </div>
      </div>
    </div>
  );
}

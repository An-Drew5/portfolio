'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/content/site';
import { ContactForm } from '@/components/contact/ContactForm';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Mail, Github, Linkedin, MapPin, Copy, Check, Terminal, Clock } from 'lucide-react';

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionHeading
        prompt="$ ./contact --new-message"
        tag="network socket"
        title="Get in Touch"
        description="Whether you have an inquiry about full-stack software development, CI/CD pipeline automation, or RHEL Linux operations, my inbox is open."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Sidebar Info & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <Card
            chrome
            title="channels.config"
            className="p-6 bg-bg-secondary/70 border-border-strong space-y-6"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                Direct Email Channel
              </h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary border border-border-subtle font-mono text-xs">
                <div className="flex items-center gap-2 text-text-primary truncate mr-2">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span className="truncate">{siteConfig.email}</span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded hover:bg-bg-secondary text-text-muted hover:text-accent transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                Professional Networks
              </h3>
              <div className="space-y-2">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary border border-border-subtle hover:border-accent/40 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                    <span>linkedin.com/in/andrews-oppong001</span>
                  </div>
                  <span className="text-text-muted group-hover:text-accent transition-colors">↗</span>
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary border border-border-subtle hover:border-accent/40 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-text-primary" />
                    <span>github.com/An-Drew5</span>
                  </div>
                  <span className="text-text-muted group-hover:text-accent transition-colors">↗</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle space-y-3 font-mono text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Base Location: {siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Timezone: GMT / UTC+0 (Africa/Accra)</span>
              </div>
            </div>
          </Card>

          {/* Privacy Note */}
          <div className="p-4 rounded-lg bg-bg-secondary/40 border border-border-subtle font-mono text-[11px] text-text-muted leading-relaxed">
            <span className="text-accent font-semibold mr-1.5">[privacy]:</span>
            Messages are transmitted directly to my verified inbox via encrypted HTTPS. Direct phone number is withheld from web scraping bots and is provided on request via resume.
          </div>
        </div>
      </div>
    </div>
  );
}

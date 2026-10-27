'use strict';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { Terminal, Mail, ArrowRight } from 'lucide-react';

export function ClosingCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
      <Card
        chrome
        title="andrews@rhel-box:~/contact"
        className="bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary border-border-strong text-center"
      >
        <div className="py-12 px-6 sm:px-12 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent px-3 py-1 rounded-full bg-accent-muted border border-accent/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>$ ./dispatch-message --recipient=andrews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Ready to discuss reliable full-stack systems or Linux infrastructure?
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Whether you need a full-stack engineer who builds multi-tenant SaaS with disciplined
            CI/CD or a dedicated operations mindset preparing for RHCSA on RHEL, let's connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              suffixSymbol="→"
              id="cta-contact-btn"
            >
              Get in touch
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href={`mailto:${siteConfig.email}`}
              id="cta-email-btn"
            >
              <Mail className="w-4 h-4 mr-2 text-accent" />
              <span>{siteConfig.email}</span>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}

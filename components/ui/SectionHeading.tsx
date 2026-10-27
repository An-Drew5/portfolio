'use strict';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  prompt?: string;
  title: string;
  description?: string;
  tag?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  prompt,
  title,
  description,
  tag,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 sm:mb-12 space-y-2',
        align === 'center' ? 'text-center max-w-2xl mx-auto' : 'text-left',
        className
      )}
    >
      {/* Terminal prompt indicator / tag */}
      <div
        className={cn(
          'inline-flex items-center gap-2 font-mono text-xs text-accent tracking-wide',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        {prompt ? (
          <span className="text-text-muted">{prompt}</span>
        ) : (
          <span className="text-text-muted">$</span>
        )}
        {tag && (
          <span className="px-2 py-0.5 rounded bg-accent-muted border border-accent/20">
            {tag}
          </span>
        )}
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

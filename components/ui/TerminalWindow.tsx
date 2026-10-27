'use strict';

import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export function TerminalWindow({
  title = 'bash — 80x24',
  badge,
  children,
  className,
  headerClassName,
  bodyClassName,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'group relative rounded-lg border border-border-subtle bg-bg-secondary/90 backdrop-blur-md shadow-card overflow-hidden transition-all duration-300 hover:border-border-strong',
        className
      )}
    >
      {/* Terminal Title Bar */}
      <div
        className={cn(
          'flex items-center justify-between px-4 py-2.5 bg-bg-tertiary/70 border-b border-border-subtle select-none',
          headerClassName
        )}
      >
        <div className="flex items-center space-x-2">
          {/* Window control dots */}
          <div className="w-3 h-3 rounded-full bg-[#ef4444]/80 border border-[#b91c1c]/60" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80 border border-[#b45309]/60" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]/80 border border-[#15803d]/60" />
          <span className="ml-2 font-mono text-xs text-text-muted tracking-tight truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </div>

        {badge && (
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-accent-muted text-accent border border-accent-glow font-medium">
            {badge}
          </span>
        )}
      </div>

      {/* Terminal Body */}
      <div className={cn('p-4 sm:p-6 font-mono text-sm leading-relaxed', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

'use strict';

import React from 'react';
import { cn } from '@/lib/utils';

export type SystemStatus = 'active (running)' | 'in-progress' | 'planned' | 'inactive';

interface StatusPillProps {
  status: SystemStatus | string;
  className?: string;
  prefix?: string;
}

export function StatusPill({ status, className, prefix }: StatusPillProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'active (running)':
      case 'active':
        return {
          dotBg: 'bg-emerald-400',
          dotShadow: 'shadow-[0_0_8px_#34d399]',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30',
          label: 'active (running)',
        };
      case 'in-progress':
        return {
          dotBg: 'bg-amber-400 animate-pulse',
          dotShadow: 'shadow-[0_0_8px_#fbbf24]',
          badgeBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
          label: 'in progress',
        };
      case 'planned':
        return {
          dotBg: 'bg-sky-400',
          dotShadow: 'shadow-[0_0_8px_#38bdf8]',
          badgeBg: 'bg-sky-500/10 text-sky-500 border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30',
          label: 'planned',
        };
      default:
        return {
          dotBg: 'bg-zinc-400',
          dotShadow: 'none',
          badgeBg: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
          label: status,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-xs border tracking-tight select-none',
        config.badgeBg,
        className
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full inline-block', config.dotBg, config.dotShadow)}
        aria-hidden="true"
      />
      <span>
        {prefix ? `${prefix}: ` : ''}
        {config.label}
      </span>
    </span>
  );
}

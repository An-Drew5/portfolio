'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Terminal, ShieldCheck } from 'lucide-react';

interface ProfilePhotoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProfilePhoto({ className, size = 'lg' }: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24 text-2xl',
    md: 'w-40 h-40 text-4xl',
    lg: 'w-56 h-56 sm:w-64 sm:h-64 text-5xl',
  };

  return (
    <div className={cn('relative inline-block select-none', className)}>
      {/* Outer terminal border container */}
      <div
        className={cn(
          'relative rounded-2xl border-2 border-border-strong bg-bg-secondary/90 p-2 shadow-card backdrop-blur-md overflow-hidden group',
          sizeClasses[size]
        )}
      >
        {/* Terminal Corner Reticles */}
        <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-accent" />
        <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-accent" />
        <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-accent" />
        <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-accent" />

        {/* Inner Content Area */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-bg-tertiary flex items-center justify-center">
          {!imageError ? (
            <Image
              src="/images/andrews.jpg"
              alt="Andrews Oppong — Full-Stack & DevOps Engineer"
              fill
              sizes="(max-width: 640px) 224px, 256px"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Tasteful Terminal Placeholder: Initials "OA" in terminal frame */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-bg-secondary via-bg-tertiary to-bg-primary text-center">
              <div className="flex items-center gap-1 text-accent text-xs font-mono mb-2 opacity-80">
                <Terminal className="w-3.5 h-3.5" />
                <span>andrews@rhel</span>
              </div>
              <div className="font-mono font-bold tracking-tighter text-accent drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                OA
              </div>
              <div className="mt-2 text-[10px] font-mono text-text-muted flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>RHCSA Track</span>
              </div>
            </div>
          )}
        </div>

        {/* Status Pill attached to frame */}
        <div className="absolute -bottom-1 -right-1 z-20">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-bg-primary border border-border-strong text-emerald-400 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>RHEL 9</span>
          </span>
        </div>
      </div>
    </div>
  );
}

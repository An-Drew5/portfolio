'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableGlow?: boolean;
  chrome?: boolean;
  title?: string;
  badge?: React.ReactNode;
}

export function Card({
  className,
  children,
  enableGlow = true,
  chrome = false,
  title,
  badge,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={enableGlow ? handleMouseMove : undefined}
      onMouseLeave={enableGlow ? handleMouseLeave : undefined}
      className={cn(
        'relative rounded-lg border border-border-subtle bg-bg-secondary/70 backdrop-blur-sm transition-all duration-300 hover:border-border-strong group overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle cursor-following glow */}
      {enableGlow && mousePos.active && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-subtle), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Optional Window Chrome */}
      {chrome && (
        <div className="relative z-10 flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-bg-tertiary/40">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            {title && (
              <span className="ml-2 font-mono text-xs text-text-muted">{title}</span>
            )}
          </div>
          {badge && <div className="text-xs">{badge}</div>}
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

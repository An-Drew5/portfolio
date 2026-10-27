'use strict';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'terminal';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  download?: string | boolean;
  prefixSymbol?: string;
  suffixSymbol?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      href,
      external,
      download,
      prefixSymbol,
      suffixSymbol,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none rounded-lg';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-accent text-text-inverse hover:bg-accent-hover shadow-sm hover:shadow-glow font-semibold',
      secondary:
        'bg-bg-secondary text-text-primary border border-border-subtle hover:border-border-strong hover:bg-bg-tertiary',
      outline:
        'bg-transparent text-text-primary border border-accent/40 hover:border-accent hover:bg-accent-subtle',
      ghost:
        'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-secondary',
      terminal:
        'bg-bg-secondary text-accent border border-accent/30 hover:border-accent hover:bg-accent-muted shadow-sm',
    };

    const content = (
      <>
        {prefixSymbol && <span className="opacity-70">{prefixSymbol}</span>}
        <span>{children}</span>
        {suffixSymbol && <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">{suffixSymbol}</span>}
      </>
    );

    const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

    if (href) {
      if (external || download) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            download={download}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>
        );
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

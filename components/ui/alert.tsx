'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'error' | 'success';
  className?: string;
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  const variants = {
    default: 'bg-surface border-border text-foreground',
    warning: 'bg-secondary/10 border-secondary/20 text-secondary-foreground',
    error: 'bg-destructive/10 border-destructive/20 text-destructive-foreground',
    success: 'bg-primary/10 border-primary/20 text-primary-foreground'
  };

  const icons = {
    default: 'info',
    warning: 'alertTriangle',
    error: 'alertCircle',
    success: 'checkCircle'
  };

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border',
      variants[variant],
      className
    )}>
      <Icon 
        name={icons[variant] as any} 
        size="sm" 
        className="flex-shrink-0 mt-0.5" 
      />
      <div className="flex-1 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDescription({ children, className }: AlertDescriptionProps) {
  return (
    <div className={cn('text-sm leading-relaxed', className)}>
      {children}
    </div>
  );
}
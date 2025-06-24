'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'category' | 'pro' | 'new' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const baseStyles = 'inline-flex items-center rounded-full font-medium transition-all duration-200';
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };
  
  const variantStyles = {
    category: 'bg-utility-new text-background',
    pro: 'bg-secondary text-secondary-foreground',
    new: 'bg-utility-new text-background animate-pulse',
    default: 'bg-muted text-muted-foreground'
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

export interface TemplateCardProps {
  id: string;
  title: string;
  author: string;
  usageCount: number;
  date: string;
  category: string;
  isPro?: boolean;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export function TemplateCard({
  id,
  title,
  author,
  usageCount,
  date,
  category,
  isPro = false,
  icon = "template",
  className,
  onClick
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-200 cursor-pointer group",
        className
      )}
      onClick={onClick}
    >
      {/* Header with Icon and Pro Tag */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon name={icon as any} size="lg" className="text-primary" />
        </div>
        {isPro && <Tag variant="pro" size="sm">Pro</Tag>}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Author */}
      <p className="text-sm text-muted-foreground mb-4">
        by {author}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="users" size="xs" />
            {usageCount.toLocaleString()}
          </span>
          <span>{date}</span>
        </div>
        <Tag variant="category" size="sm">{category}</Tag>
      </div>
    </div>
  );
}
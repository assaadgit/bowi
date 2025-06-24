'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

export interface SidebarNavigationProps {
  className?: string;
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const navigationItems = [
    {
      id: 'templates',
      label: 'My Templates',
      icon: 'file',
      isActive: false
    },
    {
      id: 'hub',
      label: 'Template Hub',
      icon: 'globe',
      isActive: true
    },
    {
      id: 'credentials',
      label: 'Saved Credentials',
      icon: 'key',
      isActive: false,
      hasNewTag: true
    },
    {
      id: 'files',
      label: 'My Files',
      icon: 'folder',
      isActive: false,
      hasNewTag: true
    }
  ];

  return (
    <nav className={cn("w-64 bg-surface border-r border-border h-full", className)}>
      <div className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Navigation
        </h3>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  item.isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon as any} size="sm" />
                  {item.label}
                </div>
                {item.hasNewTag && (
                  <Tag variant="new" size="sm">New</Tag>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
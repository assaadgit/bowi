'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from './icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet';

interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  isPro: boolean;
}

interface NavigationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  isProUser: boolean;
  onProFeatureClick: (e: React.MouseEvent, path: string) => void;
}

export function NavigationSheet({
  isOpen,
  onClose,
  navigationItems = [],
  isProUser,
  onProFeatureClick,
}: NavigationSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Icon name="home" size="md" className="text-primary" />
            <span>Convergence</span>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-8 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.isPro && !isProUser ? (
                <button
                  onClick={(e) => {
                    onProFeatureClick(e, item.href);
                    onClose();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-muted-foreground hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                >
                  <Icon name={item.icon as any} size="sm" />
                  <span className="flex-1">{item.name}</span>
                  <Icon name="lock" size="xs" className="text-muted-foreground" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center space-x-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-surface rounded-lg transition-colors"
                >
                  <Icon name={item.icon as any} size="sm" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Icon } from './icon';
import { cn } from '@/lib/utils';

interface UserProfileAvatarProps {
  initials?: string;
  name?: string;
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSignOutClick?: () => void;
  onUpgradeClick?: () => void;
}

export function UserProfileAvatar({
  initials: propInitials,
  name: propName,
  email: propEmail,
  size = 'md',
  onProfileClick,
  onSettingsClick,
  onSignOutClick,
  onUpgradeClick,
}: UserProfileAvatarProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  // Use Auth0 user data if available, otherwise fall back to props
  const displayName = user?.name || propName || 'User';
  const displayEmail = user?.email || propEmail || '';
  const displayInitials = propInitials || 
    (displayName ? displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U');

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    onProfileClick?.();
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    onSettingsClick?.();
  };

  const handleUpgradeClick = () => {
    setIsOpen(false);
    onUpgradeClick?.();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors',
          sizeClasses[size]
        )}
      >
        {displayInitials}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg z-50 animate-scale-in">
            {/* User Info Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
                  sizeClasses.md
                )}>
                  {displayInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {displayName}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {displayEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
              >
                <Icon name="user" size="sm" className="text-muted-foreground" />
                Profile
              </button>
              
              <button
                onClick={handleSettingsClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
              >
                <Icon name="settings" size="sm" className="text-muted-foreground" />
                Settings
              </button>

              <button
                onClick={handleUpgradeClick}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
              >
                <Icon name="zap" size="sm" className="text-secondary" />
                <span>Upgrade plan</span>
                <div className="ml-auto bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Pro
                </div>
              </button>

              <div className="border-t border-border my-2" />
              
              <a
                href="/api/auth/logout"
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
              >
                <Icon name="logOut" size="sm" className="text-muted-foreground" />
                Sign out
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
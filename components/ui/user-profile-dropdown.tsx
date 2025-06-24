'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';

interface UserProfileDropdownProps {
  name: string;
  email: string;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onSignOutClick: () => void;
  onUpgradeClick: () => void;
}

export function UserProfileDropdown({
  name,
  email,
  onProfileClick,
  onSettingsClick,
  onSignOutClick,
  onUpgradeClick
}: UserProfileDropdownProps) {
  const menuItems = [
    { icon: 'layout', label: 'Template Hub', onClick: () => console.log('Template Hub clicked') },
    { icon: 'file', label: 'My Templates', onClick: () => console.log('My Templates clicked') },
    { icon: 'zap', label: 'My Automations', onClick: () => console.log('My Automations clicked') },
    { icon: 'crown', label: 'Upgrade plan', onClick: onUpgradeClick },
    { icon: 'settings', label: 'Settings', onClick: onSettingsClick }
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-xl shadow-2xl py-2 z-50 animate-scale-in">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-border">
        <div className="font-medium text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{email}</div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
          >
            <Icon name={item.icon as any} size="sm" className="text-muted-foreground" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <div className="border-t border-border pt-2">
        <button
          onClick={onSignOutClick}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-background/50 transition-colors"
        >
          <Icon name="signOut" size="sm" className="text-muted-foreground" />
          Sign out
        </button>
      </div>
    </div>
  );
}
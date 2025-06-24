'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Icon } from './icon';
import { UserProfileAvatar } from './user-profile-avatar';
import { ThemeToggle } from './theme-toggle';
import { NavigationSheet } from './navigation-sheet';

export function SiteHeader() {
  const { user, isLoading } = useUser();

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleSignOutClick = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Icon name="home" size="md" className="text-primary" />
            <span className="text-xl font-bold text-foreground">
              Convergence
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard/templates" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Templates
            </Link>
            <Link 
              href="/dashboard/automations" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Automations
            </Link>
            <Link 
              href="/dashboard/files" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Files
            </Link>
            <Link 
              href="/dashboard/template-hub" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Template Hub
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile or Loading */}
            {isLoading ? (
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse" />
            ) : user ? (
              <UserProfileAvatar
                initials={user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                name={user.name || 'User'}
                email={user.email || ''}
                onProfileClick={handleProfileClick}
                onSettingsClick={handleSettingsClick}
                onSignOutClick={handleSignOutClick}
              />
            ) : (
              <Link href="/api/auth/login">
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
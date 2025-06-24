'use client';

import React from 'react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { UserProfileAvatar } from '@/components/ui/user-profile-avatar';
import { Tag } from '@/components/ui/tag';
import { Icon } from '@/components/ui/icon';
import Link from 'next/link';

export default function DesignSystemPage() {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked!');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked!');
  };

  const handleSignOutClick = () => {
    console.log('Sign out clicked!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground mb-2">Design System Foundation</h1>
            <p className="text-muted-foreground">Core Components & Demo Pages</p>
          </div>
          <UserProfileAvatar
            initials="AS"
            name="Alex Smith"
            email="alex.smith@example.com"
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onSignOutClick={handleSignOutClick}
          />
        </header>

        {/* Navigation to Demo Pages */}
        <section className="bg-surface rounded-xl p-8">
          <h2 className="text-foreground mb-6">Demo Pages</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/">
              <PrimaryButton>
                Welcome/Landing Page
              </PrimaryButton>
            </Link>
            <Link href="/auth">
              <PrimaryButton variant="secondary">
                Authentication Page
              </PrimaryButton>
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <main className="space-y-12">
          {/* Buttons Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">Primary Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton onClick={handleButtonClick}>
                Continue
              </PrimaryButton>
              <PrimaryButton variant="secondary" onClick={handleButtonClick}>
                Pro Feature
              </PrimaryButton>
              <PrimaryButton variant="outline" onClick={handleButtonClick}>
                Outline Style
              </PrimaryButton>
              <PrimaryButton size="sm" onClick={handleButtonClick}>
                Small Button
              </PrimaryButton>
              <PrimaryButton size="lg" onClick={handleButtonClick}>
                Large Button
              </PrimaryButton>
              <PrimaryButton loading onClick={handleButtonClick}>
                Loading State
              </PrimaryButton>
              <PrimaryButton disabled onClick={handleButtonClick}>
                Disabled
              </PrimaryButton>
            </div>
          </section>

          {/* Tags Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">Tags & Labels</h2>
            <div className="flex flex-wrap gap-4">
              <Tag variant="category">Business</Tag>
              <Tag variant="pro">Pro</Tag>
              <Tag variant="new">New</Tag>
              <Tag variant="default">Default</Tag>
              <Tag variant="category" size="sm">Small Category</Tag>
              <Tag variant="pro" size="sm">Small Pro</Tag>
            </div>
          </section>

          {/* Icons Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">Icon Library</h2>
            <div className="grid grid-cols-8 gap-6">
              <div className="flex flex-col items-center gap-2">
                <Icon name="menu" size="lg" />
                <span className="text-label text-muted-foreground">Menu</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="search" size="lg" />
                <span className="text-label text-muted-foreground">Search</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="upload" size="lg" />
                <span className="text-label text-muted-foreground">Upload</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="settings" size="lg" />
                <span className="text-label text-muted-foreground">Settings</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="user" size="lg" />
                <span className="text-label text-muted-foreground">User</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="bell" size="lg" />
                <span className="text-label text-muted-foreground">Bell</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="home" size="lg" />
                <span className="text-label text-muted-foreground">Home</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Icon name="signOut" size="lg" />
                <span className="text-label text-muted-foreground">Sign Out</span>
              </div>
            </div>
          </section>

          {/* User Profile Avatars Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">User Profile Avatars</h2>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <UserProfileAvatar
                  initials="AS"
                  size="sm"
                  name="Alex Smith"
                  email="alex@example.com"
                  onProfileClick={handleProfileClick}
                  onSettingsClick={handleSettingsClick}
                  onSignOutClick={handleSignOutClick}
                />
                <span className="text-label text-muted-foreground">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <UserProfileAvatar
                  initials="JD"
                  size="md"
                  name="Jane Doe"
                  email="jane@example.com"
                  onProfileClick={handleProfileClick}
                  onSettingsClick={handleSettingsClick}
                  onSignOutClick={handleSignOutClick}
                />
                <span className="text-label text-muted-foreground">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <UserProfileAvatar
                  initials="MJ"
                  size="lg"
                  name="Michael Johnson"
                  email="michael@example.com"
                  onProfileClick={handleProfileClick}
                  onSettingsClick={handleSettingsClick}
                  onSignOutClick={handleSignOutClick}
                />
                <span className="text-label text-muted-foreground">Large</span>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">Typography Scale</h2>
            <div className="space-y-4">
              <div>
                <h1 className="text-foreground">H1 - Page Title</h1>
                <p className="text-muted-foreground text-sm">Large and bold for main page titles</p>
              </div>
              <div>
                <h2 className="text-foreground">H2 - Section Title</h2>
                <p className="text-muted-foreground text-sm">Medium size, bold for section headers</p>
              </div>
              <div>
                <h3 className="text-foreground">H3 - Subsection Title</h3>
                <p className="text-muted-foreground text-sm">Smaller heading for subsections</p>
              </div>
              <div>
                <p className="text-foreground">Body text - Standard paragraph text with proper line height and spacing for optimal readability.</p>
                <p className="text-muted-foreground text-sm">Standard size, regular weight for body content</p>
              </div>
              <div>
                <span className="text-label text-muted-foreground">Label text - Small size for tags and labels</span>
              </div>
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="bg-surface rounded-xl p-8">
            <h2 className="text-foreground mb-6">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="h-16 w-full bg-primary rounded-lg"></div>
                <p className="text-sm font-medium text-foreground">Primary</p>
                <p className="text-xs text-muted-foreground">#00A99D</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 w-full bg-secondary rounded-lg"></div>
                <p className="text-sm font-medium text-foreground">Secondary</p>
                <p className="text-xs text-muted-foreground">#FFB84D</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 w-full bg-utility-new rounded-lg"></div>
                <p className="text-sm font-medium text-foreground">Utility New</p>
                <p className="text-xs text-muted-foreground">#D4EE7F</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 w-full bg-surface rounded-lg border border-border"></div>
                <p className="text-sm font-medium text-foreground">Surface</p>
                <p className="text-xs text-muted-foreground">#1C1C1E</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
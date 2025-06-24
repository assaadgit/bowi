'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Icon } from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface InfoCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function InfoCard({ title, description, children }: InfoCardProps) {
  return (
    <div className="bg-surface rounded-xl p-6 border border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

interface SettingRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

function SettingRow({ label, description, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, isLoading } = useUser();
  const [storeCookies, setStoreCookies] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleClearCookies = () => {
    console.log('Clear cookies clicked');
    toast('Cookies cleared', {
      description: 'All stored cookies have been removed.',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo clear cookies');
          toast.success('Cookies restored');
        },
      },
    });
  };

  const handleResetPassword = () => {
    console.log('Reset password clicked');
    toast.success('Password reset email sent', {
      description: 'Check your email for instructions to reset your password.',
    });
  };

  const handleStoreCookiesChange = (checked: boolean) => {
    setStoreCookies(checked);
    toast.success('Settings saved!', {
      description: `Cookie storage ${checked ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleEmailNotificationsChange = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success('Settings saved!', {
      description: `Email notifications ${checked ? 'enabled' : 'disabled'}.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-surface rounded-lg animate-pulse mb-8"></div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-48 bg-surface rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Determine authentication method
  const getAuthMethod = () => {
    if (user?.sub?.includes('google')) return 'Google';
    if (user?.sub?.includes('auth0')) return 'Email';
    return 'Unknown';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and security settings
          </p>
        </div>

        {/* Browser Cookies Section */}
        <InfoCard
          title="Browser Cookies"
          description="Enabling Cookies via Proxy is safe. We use industry-standard encryption to protect your data."
        >
          <SettingRow label="Store Cookies">
            <Switch
              checked={storeCookies}
              onCheckedChange={handleStoreCookiesChange}
            />
          </SettingRow>
          <SettingRow label="Clear Cookies">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleClearCookies}
            >
              Clear Cookies
            </Button>
          </SettingRow>
        </InfoCard>

        {/* Notifications Section */}
        <InfoCard
          title="Notifications"
          description="Keep up to date with your tasks and automations."
        >
          <SettingRow 
            label="Emails from Proxy"
            description={user?.email || 'No email available'}
          >
            <Switch
              checked={emailNotifications}
              onCheckedChange={handleEmailNotificationsChange}
            />
          </SettingRow>
        </InfoCard>

        {/* Password & Authentication Section */}
        <InfoCard
          title="Password & Authentication"
          description="Quickly change your password to keep your account secure and manage your authentication methods."
        >
          <SettingRow label="Authentication Method">
            <Badge variant="secondary" className="text-xs">
              {getAuthMethod()}
            </Badge>
          </SettingRow>
          <SettingRow label="Password Reset">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </SettingRow>
        </InfoCard>

        {/* Account Information Section */}
        <InfoCard
          title="Account Information"
          description="View and manage your account details."
        >
          <SettingRow 
            label="Email Address"
            description="Your primary email for notifications and account recovery"
          >
            <span className="text-sm text-muted-foreground">
              {user?.email || 'Not available'}
            </span>
          </SettingRow>
          <SettingRow 
            label="Account Created"
            description="When you first joined Convergence"
          >
            <span className="text-sm text-muted-foreground">
              {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'Not available'}
            </span>
          </SettingRow>
        </InfoCard>

        {/* Danger Zone */}
        <InfoCard
          title="Danger Zone"
          description="Irreversible and destructive actions."
        >
          <SettingRow 
            label="Delete Account"
            description="Permanently delete your account and all associated data"
          >
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                toast.error('Account deletion requested', {
                  description: 'Please contact support to complete this action.',
                });
              }}
            >
              Delete Account
            </Button>
          </SettingRow>
        </InfoCard>
      </div>
    </div>
  );
}
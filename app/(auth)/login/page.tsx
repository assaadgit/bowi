'use client';

import React from 'react';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Icon } from '@/components/ui/icon';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Icon name="home" size="lg" className="text-primary" />
              <span className="text-xl font-bold text-foreground">
                Convergence
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome</h2>
            <p className="text-muted-foreground">
              Sign in to your account to continue with your AI assistant
            </p>
          </div>

          {/* Single Sign In Button */}
          <div className="space-y-4">
            <a href="/api/auth/login" className="block">
              <PrimaryButton className="w-full">
                Sign In / Sign Up
              </PrimaryButton>
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
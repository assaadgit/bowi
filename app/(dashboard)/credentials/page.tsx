'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { PrimaryButton } from '@/components/ui/primary-button';

// Mock function to check if user is Pro - replace with actual logic
const useIsProUser = () => {
  // For demo purposes, return false to show the Pro gate
  return false;
};

function ProFeatureGate() {
  const handleUpgrade = () => {
    // TODO: Trigger upgrade modal or redirect to payment
    console.log('Upgrade to Pro clicked');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-24">
          <div className="bg-surface rounded-2xl p-12 border border-border">
            <Icon name="lock" size="xl" className="text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              This is a Pro Feature
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Unlock saved credentials and advanced security features with Convergence Pro.
            </p>
            <PrimaryButton size="lg" onClick={handleUpgrade}>
              Upgrade to Pro
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CredentialsPage() {
  const isProUser = useIsProUser();

  if (!isProUser) {
    return <ProFeatureGate />;
  }

  // Pro user content would go here
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Saved Credentials</h1>
            <p className="text-muted-foreground">
              Securely manage your saved login credentials for automated tasks
            </p>
          </div>
          
          {/* Pro user credentials management UI would go here */}
          <div className="bg-surface rounded-xl p-8 text-center">
            <Icon name="shield" size="lg" className="text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Secure Credential Storage
            </h3>
            <p className="text-muted-foreground">
              Your credentials are encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
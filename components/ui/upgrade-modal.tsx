'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { PrimaryButton } from './primary-button';
import { Icon } from './icon';
import { Badge } from './badge';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const proFeatures = [
    {
      icon: 'shield',
      title: 'Saved Credentials',
      description: 'Securely store login credentials for automated tasks'
    },
    {
      icon: 'folder',
      title: 'Advanced File Management',
      description: 'Upload and manage files with extended storage'
    },
    {
      icon: 'zap',
      title: 'Priority Processing',
      description: 'Get faster task execution with priority queuing'
    },
    {
      icon: 'headphones',
      title: 'Premium Support',
      description: '24/7 priority customer support and assistance'
    },
    {
      icon: 'users',
      title: 'Team Collaboration',
      description: 'Share templates and automations with your team'
    },
    {
      icon: 'barChart',
      title: 'Advanced Analytics',
      description: 'Detailed insights and usage analytics'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon name="zap" className="text-secondary" />
            Upgrade to Convergence Pro
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Pricing */}
          <div className="text-center py-6 bg-surface rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-foreground">$29</span>
              <span className="text-muted-foreground">/month</span>
              <Badge variant="secondary" className="ml-2">Popular</Badge>
            </div>
            <p className="text-muted-foreground">
              Everything you need for professional automation
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface/50 transition-colors">
                <Icon name={feature.icon as any} size="sm" className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-4">
            <PrimaryButton 
              className="flex-1" 
              onClick={() => {
                // TODO: Integrate with actual payment processor
                window.open('https://stripe.com', '_blank');
              }}
            >
              Upgrade to Pro
            </PrimaryButton>
            <PrimaryButton 
              variant="outline" 
              onClick={onClose}
              className="px-6"
            >
              Maybe Later
            </PrimaryButton>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>
              Cancel anytime • 30-day money-back guarantee • Secure payment with Stripe
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
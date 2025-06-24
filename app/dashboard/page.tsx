'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { createTask } from '@/lib/api';
import { Icon } from '@/components/ui/icon';
import { SiteHeader } from '@/components/ui/site-header';
import { TaskInputBar } from '@/components/ui/task-input-bar';
import { UserProfileAvatar } from '@/components/ui/user-profile-avatar';
import { UpgradeModal } from '@/components/ui/upgrade-modal';
import { DevBanner } from '@/components/ui/dev-banner';
import { toast } from 'sonner';

export default function Dashboard() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const router = useRouter();
  
  // Get user data with development bypass
  const { user: authUser, isLoading: authLoading } = useUser();
  
  // Mock user for development bypass
  const isDevelopmentBypass = process.env.NODE_ENV === 'development' && 
                             process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';
  
  const mockUser = {
    name: 'Dev User',
    email: 'dev@example.com',
    picture: null,
    sub: 'dev-user-id'
  };
  
  const user = isDevelopmentBypass ? mockUser : authUser;
  const isLoading = isDevelopmentBypass ? false : authLoading;

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      toast.success('Task created successfully!', {
        description: 'Your AI assistant is now working on your request.',
      });
      router.push(`/dashboard/task/${data.taskId}`);
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
      toast.error('Failed to create task', {
        description: 'Please try again or contact support if the problem persists.',
      });
    },
  });

  const handleTaskSubmit = (prompt: string) => {
    createTaskMutation.mutate(prompt);
  };

  const handleExampleClick = (example: string) => {
    handleTaskSubmit(example);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleSignOutClick = () => {
    console.log('Sign out clicked');
  };

  const handleUpgradeClick = () => {
    setIsUpgradeModalOpen(true);
  };

  const examplePrompts = [
    "Check News About Brand",
    "Review my Shopify store",
    "Analyze competitor pricing",
    "Create social media content",
    "Generate product descriptions"
  ];

  // Mock user avatars for social proof
  const mockUsers = [
    { initials: "AS", name: "Alex Smith" },
    { initials: "MJ", name: "Maria Johnson" },
    { initials: "DW", name: "David Wilson" },
    { initials: "SL", name: "Sarah Lee" },
    { initials: "RT", name: "Robert Taylor" },
    { initials: "JD", name: "Jessica Davis" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DevBanner />
        <SiteHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-surface rounded-lg"></div>
              <div className="h-8 bg-surface rounded-lg"></div>
              <div className="h-16 bg-surface rounded-lg"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DevBanner />
      <SiteHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight">
              Your AI Assistant for daily web tasks
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your workflow with intelligent automation and get more done in less time.
            </p>
          </div>

          {/* Task Input Bar */}
          <div className="space-y-6">
            <TaskInputBar 
              onSubmit={handleTaskSubmit}
              isLoading={createTaskMutation.isPending}
            />
            
            {/* Example Prompts */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(prompt)}
                    disabled={createTaskMutation.isPending}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-surface hover:bg-surface/80 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="space-y-8 pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100,000+</div>
                <div className="text-sm text-muted-foreground">Hours Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">125,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>

            {/* User Avatars */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Trusted by professionals worldwide</p>
              <div className="flex justify-center items-center space-x-2">
                {mockUsers.map((user, index) => (
                  <div key={index} className="relative">
                    <UserProfileAvatar
                      initials={user.initials}
                      name={user.name}
                      email={`${user.name.toLowerCase().replace(' ', '.')}@example.com`}
                      size="sm"
                      onProfileClick={() => {}}
                      onSettingsClick={() => {}}
                      onSignOutClick={() => {}}
                    />
                    {index < mockUsers.length - 1 && (
                      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-background rounded-full border border-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </div>
  );
}
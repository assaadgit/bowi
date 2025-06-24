'use client';

import React from 'react';
import { SiteHeader } from '@/components/ui/site-header';
import { TaskInputBar } from '@/components/ui/task-input-bar';
import { UserProfileAvatar } from '@/components/ui/user-profile-avatar';

export default function WelcomePage() {
  const handleTaskSubmit = (task: string) => {
    console.log('Task submitted:', task);
  };

  const handleExampleClick = (example: string) => {
    console.log('Example clicked:', example);
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

  return (
    <div className="min-h-screen bg-background">
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
            <TaskInputBar onSubmit={handleTaskSubmit} />
            
            {/* Example Prompts */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Try these examples:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(prompt)}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-surface hover:bg-surface/80 rounded-lg border border-border hover:border-primary/50 transition-all duration-200"
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
    </div>
  );
}
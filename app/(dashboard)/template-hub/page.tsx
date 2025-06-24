'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPublicTemplates } from '@/lib/api';
import { PublicTemplate } from '@/lib/types';
import { TemplateCard } from '@/components/ui/template-card';
import { Icon } from '@/components/ui/icon';
import { EmptyState } from '@/components/ui/empty-state';
import { CardSkeleton } from '@/components/ui/skeleton-loader';
import { toast } from 'sonner';

const categories = ['All', 'Business', 'Marketing', 'Research'];

export default function TemplateHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: templates, isLoading, isError, error } = useQuery({
    queryKey: ['publicTemplates', selectedCategory],
    queryFn: () => getPublicTemplates(selectedCategory === 'All' ? undefined : selectedCategory),
  });

  const handleTemplateClick = (template: PublicTemplate) => {
    if (template.isPro) {
      toast('Pro template selected', {
        description: `"${template.title}" requires a Pro subscription.`,
        action: {
          label: 'Upgrade',
          onClick: () => {
            toast.success('Redirecting to upgrade page...');
          },
        },
      });
    } else {
      toast.success('Template selected', {
        description: `Using "${template.title}" by ${template.author}`,
      });
    }
    console.log('Template clicked:', template.id);
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <Icon name="alertCircle" size="lg" className="text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Templates</h3>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Template Hub</h1>
            <p className="text-muted-foreground">
              Discover and use templates created by the community
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-surface/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : templates && templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.title}
                author={template.author}
                usageCount={template.usageCount}
                date={template.date}
                category={template.category}
                iconName={template.iconName}
                isPro={template.isPro}
                onClick={() => handleTemplateClick(template)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="search"
            title="No templates found"
            description="Try selecting a different category or check back later for new templates from the community."
            actionLabel="Browse All Categories"
            onAction={() => setSelectedCategory('All')}
          />
        )}
      </div>
    </div>
  );
}
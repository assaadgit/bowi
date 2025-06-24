'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyTemplates } from '@/lib/api';
import { UserTemplate } from '@/lib/types';
import { GenericDataTableView } from '@/components/ui/data-table';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { TableRowSkeleton } from '@/components/ui/skeleton-loader';
import { toast } from 'sonner';

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: templates, isLoading, isError, error } = useQuery({
    queryKey: ['myTemplates'],
    queryFn: getMyTemplates,
  });

  // Filter templates based on search term
  const filteredTemplates = templates?.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateTemplate = () => {
    toast.success('Template creation started!', {
      description: 'You will be redirected to the template builder.',
    });
    console.log('Create template clicked');
  };

  const handleEditTemplate = (template: UserTemplate) => {
    toast.success('Opening template editor', {
      description: `Editing "${template.title}"`,
    });
    console.log('Edit template:', template.id);
  };

  const handleDeleteTemplate = (template: UserTemplate) => {
    toast('Template deleted', {
      description: `"${template.title}" has been removed.`,
      action: {
        label: 'Undo',
        onClick: () => {
          toast.success('Template restored', {
            description: `"${template.title}" has been restored.`,
          });
        },
      },
    });
    console.log('Delete template:', template.id);
  };

  const columns = [
    {
      key: 'title',
      label: 'Template Name',
      render: (template: UserTemplate) => (
        <div className="flex items-center gap-3">
          <Icon name="fileText" size="sm" className="text-muted-foreground" />
          <span className="font-medium text-foreground">{template.title}</span>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (template: UserTemplate) => (
        <Badge variant="secondary" className="text-xs">
          {template.category}
        </Badge>
      )
    },
    {
      key: 'visibility',
      label: 'Visibility',
      render: (template: UserTemplate) => (
        <div className="flex items-center gap-2">
          <Icon 
            name={template.visibility === 'Public' ? 'globe' : 'lock'} 
            size="sm" 
            className="text-muted-foreground" 
          />
          <span className="text-sm text-muted-foreground">{template.visibility}</span>
        </div>
      )
    },
    {
      key: 'usageCount',
      label: 'Usage Count',
      render: (template: UserTemplate) => (
        <span className="text-sm text-muted-foreground">{template.usageCount}</span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (template: UserTemplate) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-background/50 rounded-lg transition-colors"
            onClick={() => handleEditTemplate(template)}
          >
            <Icon name="edit" size="sm" className="text-muted-foreground hover:text-foreground" />
          </button>
          <button 
            className="p-2 hover:bg-background/50 rounded-lg transition-colors"
            onClick={() => handleDeleteTemplate(template)}
          >
            <Icon name="trash2" size="sm" className="text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      )
    }
  ];

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
      <div className="max-w-7xl mx-auto">
        <GenericDataTableView
          title="My Templates"
          description="Manage your custom templates and automations"
          data={filteredTemplates}
          columns={columns}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search templates..."
          emptyStateTitle="No templates found"
          emptyStateDescription="Create your first template to get started with automation."
          primaryAction={{
            label: "Create Template",
            onClick: handleCreateTemplate
          }}
          loadingComponent={
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </div>
          }
          emptyComponent={
            <EmptyState
              icon="fileText"
              title="No templates found"
              description="Create your first template to get started with automation. Templates help you save time by reusing common workflows."
              actionLabel="Create Template"
              onAction={handleCreateTemplate}
            />
          }
        />
      </div>
    </div>
  );
}
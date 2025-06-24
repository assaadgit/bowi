'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyAutomations } from '@/lib/api';
import { Automation } from '@/lib/types';
import { GenericDataTableView } from '@/components/ui/data-table';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { TableRowSkeleton } from '@/components/ui/skeleton-loader';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AutomationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: automations, isLoading, isError, error } = useQuery({
    queryKey: ['myAutomations'],
    queryFn: getMyAutomations,
  });

  // Filter automations based on search term
  const filteredAutomations = automations?.filter(automation =>
    automation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Paused':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleCreateAutomation = () => {
    toast.success('Automation creation started!', {
      description: 'You will be redirected to the automation builder.',
    });
    console.log('Create automation clicked');
  };

  const handlePlayAutomation = (automation: Automation) => {
    toast.success('Automation started', {
      description: `"${automation.title}" is now running.`,
    });
    console.log('Play automation:', automation.id);
  };

  const handlePauseAutomation = (automation: Automation) => {
    toast('Automation paused', {
      description: `"${automation.title}" has been paused.`,
      action: {
        label: 'Resume',
        onClick: () => {
          toast.success('Automation resumed', {
            description: `"${automation.title}" is now running again.`,
          });
        },
      },
    });
    console.log('Pause automation:', automation.id);
  };

  const columns = [
    {
      key: 'title',
      label: 'Automation Name',
      render: (automation: Automation) => (
        <div className="flex items-center gap-3">
          <Icon name="zap" size="sm" className="text-primary" />
          <span className="font-medium text-foreground">{automation.title}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (automation: Automation) => (
        <Badge className={`text-xs ${getStatusColor(automation.status)}`}>
          {automation.status}
        </Badge>
      )
    },
    {
      key: 'scheduledFor',
      label: 'Next Run',
      render: (automation: Automation) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(automation.scheduledFor), 'MMM dd, yyyy HH:mm')}
        </span>
      )
    },
    {
      key: 'frequency',
      label: 'Frequency',
      render: (automation: Automation) => (
        <span className="text-sm text-muted-foreground">{automation.frequency}</span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (automation: Automation) => (
        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-background/50 rounded-lg transition-colors"
            onClick={() => handlePlayAutomation(automation)}
          >
            <Icon name="play" size="sm" className="text-muted-foreground hover:text-foreground" />
          </button>
          <button 
            className="p-2 hover:bg-background/50 rounded-lg transition-colors"
            onClick={() => handlePauseAutomation(automation)}
          >
            <Icon name="pause" size="sm" className="text-muted-foreground hover:text-foreground" />
          </button>
          <button className="p-2 hover:bg-background/50 rounded-lg transition-colors">
            <Icon name="settings" size="sm" className="text-muted-foreground hover:text-foreground" />
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
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Automations</h3>
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
          title="My Automations"
          description="Monitor and manage your automated tasks"
          data={filteredAutomations}
          columns={columns}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search automations..."
          emptyStateTitle="No automations found"
          emptyStateDescription="Create your first automation to streamline your workflow."
          primaryAction={{
            label: "Create Automation",
            onClick: handleCreateAutomation
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
              icon="zap"
              title="No automations found"
              description="Create your first automation to streamline repetitive tasks and boost your productivity."
              actionLabel="Create Automation"
              onAction={handleCreateAutomation}
            />
          }
        />
      </div>
    </div>
  );
}
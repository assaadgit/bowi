'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getTaskData } from '@/lib/api';
import { useTaskWebSocket } from '@/lib/hooks/useTaskWebSocket';
import { TaskData, Step } from '@/lib/types';
import { ViewSwitcher } from '@/components/ui/view-switcher';
import { ChatMessage } from '@/components/ui/chat-message';
import { ProxysView } from '@/components/ui/proxys-view';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, BrainCircuit, CheckCircle, AlertTriangle } from 'lucide-react';

// Agent Status Component
interface AgentStatusProps {
  icon: React.ReactNode;
  label: string;
  status: 'active' | 'pending' | 'completed';
}

function AgentStatus({ icon, label, status }: AgentStatusProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Badge className={`flex items-center gap-2 px-3 py-2 ${getStatusStyles()}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Badge>
  );
}

// Steps Display Component
interface StepsDisplayProps {
  steps: Step[];
  completedSteps: number;
}

function StepsDisplay({ steps, completedSteps }: StepsDisplayProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-surface rounded-lg hover:bg-surface/80 transition-colors">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium text-foreground">
            Proxy has completed: {completedSteps} steps
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm">{isOpen ? 'Hide all' : 'Show all'}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {step.agentIcon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground text-sm mb-1">
                {step.agentName}
              </div>
              <div className="text-sm text-muted-foreground">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function TaskPage() {
  const params = useParams();
  const taskId = params.taskId as string;
  const [currentView, setCurrentView] = useState<'chat' | 'proxy'>('chat');

  const { data: taskData, isLoading, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskData(taskId),
    refetchOnWindowFocus: false,
  });

  // Initialize WebSocket connection for real-time updates
  useTaskWebSocket(taskId);

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <Icon name="alertCircle" size="lg" className="text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Task</h3>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-12 bg-surface rounded-lg animate-pulse"></div>
          <div className="h-16 bg-surface rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-20 bg-surface rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <Icon name="search" size="lg" className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Task not found</h3>
          <p className="text-muted-foreground">The requested task could not be found.</p>
        </div>
      </div>
    );
  }

  // Mock steps with icons for display
  const stepsWithIcons: Step[] = taskData.steps.map(step => ({
    ...step,
    agentIcon: step.agentName.includes('Research') ? (
      <Icon name="search" size="sm" className="text-blue-500" />
    ) : step.agentName.includes('Analysis') ? (
      <BrainCircuit className="h-4 w-4 text-purple-500" />
    ) : (
      <Icon name="fileText" size="sm" className="text-green-500" />
    )
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header Notice */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20 p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-yellow-200 text-sm text-center">
            ⚠️ Thank you for your support! As we join Salesforce, Proxy will conclude in one month, on July 15, 2025, to make way for bigger innovations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* View Switcher */}
        <ViewSwitcher 
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {currentView === 'chat' ? (
          <>
            {/* Agent Status */}
            <div className="flex flex-wrap gap-3">
              <AgentStatus
                icon={<CheckCircle className="h-4 w-4" />}
                label="Proxy"
                status="completed"
              />
              <AgentStatus
                icon={<BrainCircuit className="h-4 w-4" />}
                label="Clarification Agent"
                status="active"
              />
            </div>

            {/* Chat Messages */}
            <div className="space-y-4">
              {taskData.chatHistory.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              
              {/* Special Status Message */}
              <ChatMessage
                role="agent"
                content="Proxy is executing the task - agents are being spun up and you can switch between tabs to see them in action ✨"
                isStatus={true}
              />
            </div>

            {/* Steps Display */}
            <StepsDisplay 
              steps={stepsWithIcons}
              completedSteps={1}
            />
          </>
        ) : (
          <ProxysView screenshots={taskData.screenshots} />
        )}
      </div>
    </div>
  );
}
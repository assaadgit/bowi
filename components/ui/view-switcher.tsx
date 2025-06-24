'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, MessageSquare, Wand2, Files } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewSwitcherProps {
  currentView: 'chat' | 'proxy';
  onViewChange: (view: 'chat' | 'proxy') => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center justify-between bg-surface rounded-lg border border-border p-1">
      {/* Tab Navigation */}
      <div className="flex items-center">
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
            "hover:bg-background/50",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Monitor className="h-4 w-4" />
          Proxy's View
        </button>
        
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
            "hover:bg-background/50",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Wand2 className="h-4 w-4" />
          Template Studio
        </button>
        
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
            "hover:bg-background/50",
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <Files className="h-4 w-4" />
          Files
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center bg-background rounded-md p-1">
        <Button
          variant={currentView === 'chat' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('chat')}
          className={cn(
            "h-8 px-3 text-xs",
            currentView === 'chat' && "bg-primary text-primary-foreground"
          )}
        >
          <MessageSquare className="h-3 w-3 mr-1" />
          Chat
        </Button>
        
        <Button
          variant={currentView === 'proxy' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('proxy')}
          className={cn(
            "h-8 px-3 text-xs",
            currentView === 'proxy' && "bg-primary text-primary-foreground"
          )}
        >
          <Monitor className="h-3 w-3 mr-1" />
          Proxy
        </Button>
      </div>
    </div>
  );
}
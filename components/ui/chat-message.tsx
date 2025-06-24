'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  role: 'user' | 'agent';
  content: string;
  isStatus?: boolean;
  timestamp?: string;
}

export function ChatMessage({ role, content, isStatus = false, timestamp }: ChatMessageProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 relative group">
          <p className="text-sm leading-relaxed">{content}</p>
          <button
            onClick={handleCopy}
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg bg-surface hover:bg-surface/80 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon name="copy" size="sm" className="text-muted-foreground hover:text-foreground" />
          </button>
          {timestamp && (
            <div className="text-xs text-primary-foreground/70 mt-1">
              {timestamp}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] flex gap-3">
        {/* Agent Avatar */}
        <div className="flex-shrink-0 w-8 h-8 bg-surface rounded-full flex items-center justify-center mt-1">
          <Icon name="bot" size="sm" className="text-muted-foreground" />
        </div>
        
        {/* Message Content */}
        <div className={cn(
          "rounded-2xl rounded-tl-sm px-4 py-3",
          isStatus ? "bg-primary/10 border border-primary/20" : "bg-surface"
        )}>
          {isStatus && (
            <div className="flex items-center gap-2 mb-3">
              <Icon name="zap" size="sm" className="text-primary" />
              <span className="text-sm font-medium text-primary">Proxy</span>
            </div>
          )}
          
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {content}
          </p>
          
          {isStatus && (
            <div className="mt-3">
              <Progress value={65} className="h-2" />
            </div>
          )}
          
          {timestamp && (
            <div className="text-xs text-muted-foreground mt-2">
              {timestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
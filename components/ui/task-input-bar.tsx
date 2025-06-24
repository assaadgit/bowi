'use client';

import React, { useState } from 'react';
import { Icon } from './icon';
import { Tag } from './tag';
import { cn } from '@/lib/utils';

interface TaskInputBarProps {
  placeholder?: string;
  className?: string;
  onSubmit?: (value: string) => void;
}

export function TaskInputBar({ 
  placeholder = "Ask anything or describe your task...", 
  className = '',
  onSubmit 
}: TaskInputBarProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
    }
  };

  const handleAttachmentClick = () => {
    console.log('Attachment clicked');
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={cn(
          "flex items-center bg-surface border border-border rounded-xl px-4 py-3 transition-all duration-200",
          isFocused && "ring-2 ring-primary/20 border-primary/50"
        )}>
          {/* Attachment button */}
          <button
            type="button"
            onClick={handleAttachmentClick}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-colors mr-3"
          >
            <Icon name="upload" size="sm" className="text-muted-foreground hover:text-foreground" />
          </button>

          {/* Input field */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
          />

          {/* Right side controls */}
          <div className="flex items-center space-x-3 ml-3">
            <Tag variant="pro" size="sm">
              Pro
            </Tag>
            <button
              type="submit"
              disabled={!value.trim()}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                value.trim() 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Icon name="search" size="sm" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
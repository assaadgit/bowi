'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export function ProxysView() {
  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Browser Header */}
      <div className="h-11 flex items-center px-4 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-muted-foreground">
          Proxy's View
        </div>
        <div className="w-12"></div>
      </div>

      {/* Address Bar */}
      <div className="h-12 flex items-center px-4 border-b border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="chevronLeft" size="sm" />
          <Icon name="chevronRight" size="sm" />
          <Icon name="refresh" size="sm" className="ml-2" />
        </div>
        <div className="flex-1 mx-4 bg-input rounded-md h-8 flex items-center px-3">
          <Icon name="globe" size="sm" className="text-muted-foreground mr-2" />
          <span className="text-sm text-foreground">https://www.google.com</span>
        </div>
        <Icon name="settings" size="sm" className="text-muted-foreground" />
      </div>

      {/* Content Area */}
      <div className="p-8 bg-background aspect-video overflow-y-auto">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h1>Welcome to the Web</h1>
          <p>
            This is a simulated view of what the AI is seeing. It can navigate websites,
            read content, and interact with elements just like a human user.
          </p>
          <p>
            Here are some example elements:
          </p>
          <ul>
            <li><a href="#">This is a link</a></li>
            <li><code>This is some code</code></li>
            <li><strong>This is bold text</strong></li>
          </ul>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Example Button
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-muted/50">
        <span className="text-sm text-muted-foreground">Step 1 of 1</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="chevronLeft" size="sm" className="mr-2" />
            Previous Step
          </Button>
          <Button variant="outline" size="sm">
            Next Step
            <Icon name="chevronRight" size="sm" className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
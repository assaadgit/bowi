'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Screenshot } from '@/lib/types';
import { ArrowLeft, ArrowRight, Monitor, Image as ImageIcon } from 'lucide-react';

interface ProxysViewProps {
  screenshots: Screenshot[];
}

export function ProxysView({ screenshots }: ProxysViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(screenshots.length - 1, prev + 1));
  };

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-surface rounded-lg border border-border">
        <Monitor className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Screenshots Available</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Screenshots will appear here as Proxy navigates through websites and performs tasks.
        </p>
      </div>
    );
  }

  const currentScreenshot = screenshots[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Screenshot Display */}
      <div className="relative bg-surface rounded-lg border border-border overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={currentScreenshot.imageUrl}
            alt={`Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback for broken images
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="flex items-center justify-center h-full bg-muted">
                    <div class="text-center">
                      <div class="h-12 w-12 mx-auto mb-2 text-muted-foreground">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                      <p class="text-sm text-muted-foreground">Screenshot unavailable</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
          
          {/* Screenshot Info Overlay */}
          {currentScreenshot.description && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
              <p className="text-sm">{currentScreenshot.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex items-center justify-between bg-surface rounded-lg border border-border p-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Step {currentIndex + 1} of {screenshots.length}
          </span>
          {currentScreenshot.timestamp && (
            <span className="text-xs text-muted-foreground">
              • {new Date(currentScreenshot.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === screenshots.length - 1}
            className="h-8 w-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Screenshot Timeline */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.stepNumber}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-12 rounded border-2 overflow-hidden transition-all ${
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <img
                src={screenshot.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center justify-center h-full bg-muted">
                        <svg class="h-4 w-4 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                    `;
                  }
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
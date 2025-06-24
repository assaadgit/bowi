'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function DevBanner() {
  // Only show in development when auth is bypassed
  if (process.env.NODE_ENV !== 'development' || 
      process.env.NEXT_PUBLIC_BYPASS_AUTH !== 'true') {
    return null;
  }
  
  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <span className="text-yellow-200 text-sm font-medium">
          Development Mode: Authentication Bypassed
        </span>
      </div>
    </div>
  );
}
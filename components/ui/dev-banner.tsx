"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

export function DevBanner() {
  // Only show in development when auth is bypassed
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.NEXT_PUBLIC_BYPASS_AUTH !== "true"
  ) {
    return null;
  }

  return (
    <div className="border-b border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium text-yellow-200">
          Development Mode: Authentication Bypassed
        </span>
      </div>
    </div>
  );
}
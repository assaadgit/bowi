"use client";

import { useState } from "react";
import { Button } from "./button";
import { X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-primary-foreground p-2 text-center text-sm text-primary">
      <span className="sm:hidden">
        Salesforce has acquired Convergence.ai.
      </span>
      <span className="hidden sm:inline">
        Salesforce has acquired Convergence.ai.{" "}
        <a href="#" className="underline">
          Read the announcement.
        </a>
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
}
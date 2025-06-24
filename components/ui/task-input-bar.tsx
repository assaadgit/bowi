"use client";

import React, { useState } from "react";
import { Icon } from "./icon";
import { Button } from "./button";
import { Switch } from "./switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

interface TaskInputBarProps {
  placeholder?: string;
  className?: string;
  onSubmit?: (value: string) => void;
}

export function TaskInputBar({
  placeholder = "Ask anything or describe your task...",
  className = "",
  onSubmit,
}: TaskInputBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && onSubmit) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className={cn("bg-background", className)}>
      <div className="relative mx-auto max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-2 focus-within:ring-2 focus-within:ring-primary/20">
            {/* Left-side buttons */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="upload" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload File</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Icon name="edit" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Scratchpad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Deep Work Toggle */}
            <div className="hidden items-center gap-2 md:flex">
              <Switch id="deep-work-mode" />
              <label htmlFor="deep-work-mode" className="font-medium">
                Deep Work
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2">
                      Upgrade to Pro
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unlock Deep Work mode and other Pro features.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Text Input */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              rows={1}
            />

            {/* Send Button */}
            <Button type="submit" size="icon" disabled={!value.trim()}>
              <Icon name="search" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
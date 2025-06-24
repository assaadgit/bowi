"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type MessageVariant = "user" | "proxy" | "system";

interface ChatMessageProps {
  variant: MessageVariant;
  content: React.ReactNode;
  timestamp?: string;
  subVariant?: "loading" | "completed" | "clarification";
}

export function ChatMessage({
  variant,
  content,
  timestamp,
  subVariant,
}: ChatMessageProps) {
  const handleCopy = () => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };

  if (variant === "user") {
    return (
      <div className="flex justify-end">
        <div className="group relative max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground">
          <p className="text-sm leading-relaxed">{content}</p>
          <button
            onClick={handleCopy}
            className="absolute -left-8 top-1/2 -translate-y-1/2 rounded-lg bg-surface p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-surface/80"
          >
            <Icon
              name="file"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            />
          </button>
          {timestamp && (
            <div className="mt-1 text-xs text-primary-foreground/70">
              {timestamp}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "proxy") {
    return (
      <div className="flex justify-start">
        <div className="flex max-w-[80%] gap-3">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface">
            <Icon name="bot" size="sm" className="text-muted-foreground" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {content}
            </p>
            {timestamp && (
              <div className="mt-2 text-xs text-muted-foreground">
                {timestamp}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "system") {
    return (
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {subVariant === "loading" && (
            <Icon name="refresh" className="animate-spin" />
          )}
          {subVariant === "completed" && <Icon name="checkCircle" />}
          <span>{content}</span>
          {subVariant === "clarification" && (
            <div className="ml-2 flex gap-2">
              <Button size="sm" variant="outline">
                Yes
              </Button>
              <Button size="sm" variant="outline">
                No
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
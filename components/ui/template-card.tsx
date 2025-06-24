"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TemplateCardProps {
  title: string;
  description: string;
  author: string;
  isPro?: boolean;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export function TemplateCard({
  title,
  description,
  author,
  isPro = false,
  icon = "template",
  className,
  onClick,
}: TemplateCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-surface p-6",
        className,
      )}
    >
      <div className="flex-grow">
        {/* Header with Icon and Pro Tag */}
        <div className="mb-4 flex items-start justify-between">
          <div className="rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
            <Icon name={icon as any} size="lg" className="text-primary" />
          </div>
          {isPro && <Tag variant="pro" size="sm">Pro</Tag>}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>

        {/* Description */}
        <p className="mb-4 h-20 overflow-hidden text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">by {author}</p>
        <Button variant="outline" size="sm" onClick={onClick}>
          Use Template
        </Button>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { DataTable } from ".";

export interface GenericDataTableViewProps {
  title: string;
  description: string;
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
  }>;
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  searchPlaceholder?: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function GenericDataTableView({
  title,
  description,
  data,
  columns,
  isLoading,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  emptyStateTitle,
  emptyStateDescription,
  primaryAction,
  loadingComponent,
  emptyComponent,
}: GenericDataTableViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Icon name="plus" size="sm" />
              {primaryAction.label}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loadingComponent || (
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-1/4 rounded bg-muted"></div>
              <div className="space-y-2">
                <div className="h-4 rounded bg-muted"></div>
                <div className="h-4 w-5/6 rounded bg-muted"></div>
                <div className="h-4 w-4/6 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Icon name="plus" size="sm" />
              {primaryAction.label}
            </button>
          )}
        </div>

        {/* Empty State */}
        {emptyComponent || (
          <div className="rounded-lg border border-border bg-surface p-12 text-center">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {emptyStateTitle}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {emptyStateDescription}
            </p>
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Icon name="plus" size="sm" />
            {primaryAction.label}
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Icon
          name="search"
          size="sm"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
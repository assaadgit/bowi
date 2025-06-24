'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
  filterButtons?: Array<{
    label: string;
    onClick: () => void;
  }>;
  emptyMessage?: string;
  className?: string;
}

export function DataTable({
  columns,
  data,
  searchPlaceholder = "Search...",
  filterButtons = [],
  emptyMessage = "No results.",
  className
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
          />
        </div>
        
        {filterButtons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-foreground hover:bg-surface/80 transition-colors duration-200 flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            {button.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-background/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-6 py-4 text-left text-sm font-medium text-foreground",
                      column.sortable && "cursor-pointer hover:bg-background/80 transition-colors"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <div className="flex flex-col">
                          <Icon
                            name="chevronUp"
                            size="xs"
                            className={cn(
                              "transition-colors",
                              sortColumn === column.key && sortDirection === 'asc'
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                          <Icon
                            name="chevronDown"
                            size="xs"
                            className={cn(
                              "transition-colors -mt-1",
                              sortColumn === column.key && sortDirection === 'desc'
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-border hover:bg-background/50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-sm text-foreground">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-border hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="chevronLeft" size="sm" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-border hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Icon name="chevronRight" size="sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Generic Data Table View Interface
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
  emptyComponent
}: GenericDataTableViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Icon name="plus" size="sm" />
              {primaryAction.label}
            </button>
          )}
        </div>

        {/* Loading State */}
        {loadingComponent || (
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
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
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Icon name="plus" size="sm" />
              {primaryAction.label}
            </button>
          )}
        </div>

        {/* Empty State */}
        {emptyComponent || (
          <div className="bg-surface rounded-lg border border-border p-12 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">{emptyStateTitle}</h3>
            <p className="text-muted-foreground mb-6">{emptyStateDescription}</p>
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            {primaryAction.label}
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Icon name="search" size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-background/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-medium text-foreground"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-border hover:bg-background/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-foreground">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  const handlePreviousPage = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
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
  );
}
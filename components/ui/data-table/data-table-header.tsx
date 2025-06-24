"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Column } from ".";

interface DataTableHeaderProps {
  columns: Column[];
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  onSort: (columnKey: string) => void;
}

export function DataTableHeader({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableHeaderProps) {
  return (
    <thead className="bg-background/50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              "px-6 py-4 text-left text-sm font-medium text-foreground",
              column.sortable &&
                "cursor-pointer transition-colors hover:bg-background/80",
            )}
            onClick={() => column.sortable && onSort(column.key)}
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
                      sortColumn === column.key && sortDirection === "asc"
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                  <Icon
                    name="chevronDown"
                    size="xs"
                    className={cn(
                      "-mt-1 transition-colors",
                      sortColumn === column.key && sortDirection === "desc"
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                </div>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
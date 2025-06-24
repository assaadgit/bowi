"use client";

import React from "react";
import { Column } from ".";

interface DataTableBodyProps {
  columns: Column[];
  data: any[];
  emptyMessage: string;
}

export function DataTableBody({
  columns,
  data,
  emptyMessage,
}: DataTableBodyProps) {
  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-6 py-12 text-center text-muted-foreground"
          >
            {emptyMessage}
          </td>
        </tr>
      ) : (
        data.map((row, index) => (
          <tr
            key={index}
            className="border-t border-border transition-colors hover:bg-background/50"
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-6 py-4 text-sm text-foreground"
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
}
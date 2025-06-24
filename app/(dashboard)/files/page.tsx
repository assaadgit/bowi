"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  Column,
} from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for files
const mockFiles = [
  {
    id: "1",
    name: "Q3_Sales_Report.pdf",
    size: "2.3 MB",
    dateAdded: "2023-10-27T10:00:00Z",
  },
  {
    id: "2",
    name: "Project_Alpha_Specification.docx",
    size: "1.1 MB",
    dateAdded: "2023-10-26T15:30:00Z",
  },
  {
    id: "3",
    name: "Marketing_Campaign_Assets.zip",
    size: "15.8 MB",
    dateAdded: "2023-10-25T11:45:00Z",
  },
  {
    id: "4",
    name: "Website_Analytics_September.csv",
    size: "512 KB",
    dateAdded: "2023-10-24T09:20:00Z",
  },
];

// Columns for the data table
const columns: Column[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "dateAdded",
    label: "Date Added",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    key: "actions",
    label: "Actions",
    render: (value: any, row: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icon name="settings" size="sm" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <a href="/attachment.pdf" download>
              Download
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Rename", row.id)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Delete", row.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Files</h1>
        </div>
        <Button>Upload File</Button>
      </div>
      <DataTable
        columns={columns}
        data={mockFiles}
        searchPlaceholder="Search files..."
      />
    </div>
  );
}
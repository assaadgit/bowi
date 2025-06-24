"use client";

import React from "react";
import { GenericDataTableView } from "@/components/ui/data-table/data-table-view";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Template = {
  id: string;
  name: string;
  category: string;
  lastModified: string;
};

const mockData: Template[] = [
  {
    id: "1",
    name: "Candidate Outreach",
    category: "Recruiting",
    lastModified: "2024-06-23",
  },
  {
    id: "2",
    name: "Q3 Sales Report",
    category: "Sales",
    lastModified: "2024-06-22",
  },
  {
    id: "3",
    name: "New Hire Onboarding",
    category: "HR",
    lastModified: "2024-06-21",
  },
  {
    id: "4",
    name: "Content Marketing Plan",
    category: "Marketing",
    lastModified: "2024-06-20",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
    render: (template: Template) => (
      <span className="font-medium">{template.name}</span>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (template: Template) => (
      <Badge variant="secondary">{template.category}</Badge>
    ),
  },
  {
    key: "lastModified",
    label: "Last Modified",
    render: (template: Template) => (
      <span className="text-muted-foreground">{template.lastModified}</span>
    ),
  },
  {
    key: "actions",
    label: "",
    render: (template: Template) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                window.location.href = "#";
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.location.href = "#";
              }}
            >
              Run
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.location.href = "#";
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredData = mockData.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <GenericDataTableView
      title="My Templates"
      description="Manage your custom templates."
      data={filteredData}
      columns={columns}
      isLoading={false}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search templates..."
      emptyStateTitle="No Templates"
      emptyStateDescription="You have not created any templates yet."
      primaryAction={{
        label: "New Template",
        onClick: () => {
          window.location.href = "#";
        },
      }}
    />
  );
}
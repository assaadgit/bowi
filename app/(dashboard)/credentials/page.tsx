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

// Mock data for credentials
const mockCredentials = [
  {
    id: "1",
    name: "Gmail Account",
    username: "user@gmail.com",
    lastModified: "2023-10-26T10:00:00Z",
  },
  {
    id: "2",
    name: "GitHub",
    username: "github_user",
    lastModified: "2023-10-25T15:30:00Z",
  },
  {
    id: "3",
    name: "AWS Console",
    username: "aws-user-123",
    lastModified: "2023-10-24T11:45:00Z",
  },
];

// Columns for the data table
const columns: Column[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "username",
    label: "Username",
    sortable: true,
  },
  {
    key: "lastModified",
    label: "Last Modified",
    sortable: true,
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
          <DropdownMenuItem onClick={() => console.log("Edit", row.id)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("Delete", row.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function LockedCredentialsUI() {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
        <div className="rounded-2xl border border-border bg-surface/50 p-8 text-center">
          <Icon name="key" size="xl" className="mx-auto mb-6 text-primary" />
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Unlock Credentials Management
          </h2>
          <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
            This feature is available for Pro users. Upgrade your plan to manage
            your credentials.
          </p>
          <Button size="lg" onClick={() => console.log("Upgrade clicked")}>
            <a href="#">Upgrade to Pro</a>
          </Button>
        </div>
      </div>

      {/* Background content (visible but not interactive) */}
      <div className="pointer-events-none blur-sm">
        <DataTable
          columns={columns}
          data={mockCredentials}
          searchPlaceholder="Search credentials..."
        />
      </div>
    </div>
  );
}

export default function CredentialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Saved Credentials
          </h1>
          <p className="text-muted-foreground">
            Manage your saved credentials for automated tasks.
          </p>
        </div>
        <Button>
          <a href="#">New Credential</a>
        </Button>
      </div>
      <LockedCredentialsUI />
    </div>
  );
}
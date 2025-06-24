"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  searchPlaceholder: string;
  filterButtons: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export function DataTableToolbar({
  searchTerm,
  onSearchTermChange,
  searchPlaceholder,
  filterButtons,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        {filterButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
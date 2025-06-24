"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserProfileDropdown } from "@/components/ui/user-profile-dropdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarFooter({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <TooltipProvider>
      <div className="border-t border-border p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-muted-foreground",
                isCollapsed ? "justify-center" : "justify-start",
              )}
            >
              <Icon name="mail" className={cn(!isCollapsed && "mr-2")} />
              <span className={cn(isCollapsed ? "sr-only" : "inline")}>
                Share Your Feedback
              </span>
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Share Your Feedback</TooltipContent>
          )}
        </Tooltip>
        <UserProfileDropdown>
          <div
            className={cn(
              "mt-2 flex cursor-pointer items-center rounded-lg p-2 hover:bg-muted",
              isCollapsed ? "justify-center" : "",
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={cn("ml-3", isCollapsed ? "hidden" : "inline")}>
              <p className="text-sm font-medium">User</p>
            </div>
          </div>
        </UserProfileDropdown>
      </div>
    </TooltipProvider>
  );
}
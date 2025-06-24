"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/templates", label: "My Templates", icon: "file" },
  { href: "/template-hub", label: "Template Hub", icon: "globe" },
  { href: "/automations", label: "Automations", icon: "bot" },
  { href: "/credentials", label: "Credentials", icon: "key" },
  { href: "/files", label: "Files", icon: "folder" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function NavItems({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <nav className="flex-grow space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg p-2 transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed ? "justify-center" : "",
                )}
              >
                <Icon name={item.icon as any} className={cn(!isCollapsed && "mr-3")} />
                <span className={cn(isCollapsed ? "sr-only" : "inline")}>
                  {item.label}
                </span>
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">{item.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
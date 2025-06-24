"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { NavItems } from "./nav-items";
import { TaskHistory } from "./task-history";
import { SidebarFooter } from "./sidebar-footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarContent = (
    <>
      <div
        className={cn(
          "flex items-center p-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        {!isCollapsed && <Logo collapsed={isCollapsed} />}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Icon name={isCollapsed ? "chevronRight" : "chevronLeft"} />
        </Button>
      </div>

      <div className="p-2">
        <Button className={cn("w-full", isCollapsed ? "justify-center" : "")}>
          <Icon name="plus" className={cn(!isCollapsed && "mr-2")} />
          {!isCollapsed && "New Chat"}
        </Button>
      </div>

      <NavItems isCollapsed={isCollapsed} />

      {!isCollapsed && <TaskHistory />}

      <SidebarFooter isCollapsed={isCollapsed} />
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="m-4">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-64 flex-col p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden h-screen flex-col border-r border-border bg-background transition-all duration-300 ease-in-out md:flex",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
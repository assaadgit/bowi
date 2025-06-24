'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { navItems } from './nav-items';
import { Logo } from './logo';
import { TaskLists } from './task-lists';

export function SidebarNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-background border-r border-border transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className={cn('p-4 flex items-center', isCollapsed ? 'justify-center' : 'justify-between')}>
        {!isCollapsed && <Logo collapsed={isCollapsed} />}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Icon name={isCollapsed ? 'panel-right-open' : 'panel-left-open'} />
        </Button>
      </div>
      
      <div className="p-2">
        <Button className={cn('w-full', isCollapsed ? 'justify-center' : '')}>
          <Icon name="plus" className={cn(!isCollapsed && 'mr-2')} />
          {!isCollapsed && 'New Chat'}
        </Button>
      </div>

      <nav className="flex-grow px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center p-2 rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <Icon name={item.icon as any} className={cn(!isCollapsed && 'mr-3')} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {!isCollapsed && <TaskLists />}

      <div className="p-2 border-t border-border">
        <Button variant="ghost" className={cn('w-full text-muted-foreground', isCollapsed ? 'justify-center' : 'justify-start')}>
          <Icon name="message-square-plus" className={cn(!isCollapsed && 'mr-2')} />
          {!isCollapsed && 'Share Your Feedback'}
        </Button>
        <div className={cn('flex items-center mt-2 p-2 rounded-lg hover:bg-muted', isCollapsed ? 'justify-center' : '')}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">User</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
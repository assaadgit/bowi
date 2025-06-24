import React from 'react';
import { ongoingTasks, completedTasks } from './nav-items';

export function TaskLists() {
  return (
    <div className="px-4 py-2 flex-grow overflow-y-auto">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ongoing</h3>
      <ul className="space-y-1 text-sm">
        {ongoingTasks.map(task => (
          <li key={task.id} className="p-2 rounded-md hover:bg-muted cursor-pointer truncate">{task.title}</li>
        ))}
      </ul>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-2">Completed</h3>
      <ul className="space-y-1 text-sm">
        {completedTasks.map(task => (
          <li key={task.id} className="p-2 rounded-md hover:bg-muted cursor-pointer truncate">{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
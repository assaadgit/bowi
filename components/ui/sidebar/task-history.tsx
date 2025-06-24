"use client";

import React from "react";
import { cn } from "@/lib/utils";

const ongoingTasks = [
  { id: 1, title: "Generating report for Q2" },
  { id: 2, title: "Summarizing user feedback" },
];

const completedTasks = [
  { id: 3, title: "Drafting marketing copy" },
  { id: 4, title: "Translating product descriptions" },
];

export function TaskHistory() {
  return (
    <div className="flex-grow overflow-y-auto px-4 py-2">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Ongoing
      </h3>
      <ul className="space-y-1 text-sm">
        {ongoingTasks.map((task) => (
          <li
            key={task.id}
            className="truncate rounded-md p-2 hover:bg-muted"
          >
            {task.title}
          </li>
        ))}
      </ul>
      <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Completed
      </h3>
      <ul className="space-y-1 text-sm">
        {completedTasks.map((task) => (
          <li
            key={task.id}
            className="truncate rounded-md p-2 hover:bg-muted"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
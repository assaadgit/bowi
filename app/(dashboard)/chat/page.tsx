"use client";

import React from "react";
import { ChatMessage } from "@/components/ui/chat-message";
import { TaskInputBar } from "@/components/ui/task-input-bar";
import { ProxysView } from "@/components/ui/proxys-view";

const mockMessages = [
  {
    variant: "user" as const,
    content: "go to examtopics.com",
  },
  {
    variant: "system" as const,
    content: "Proxy is acting...",
    subVariant: "loading" as const,
  },
  {
    variant: "proxy" as const,
    content: "component:proxys-view",
  },
  {
    variant: "system" as const,
    content: "Proxy has completed the task.",
    subVariant: "completed" as const,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = React.useState(mockMessages);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {messages.map((msg, index) => {
              if (
                msg.variant === "proxy" &&
                msg.content === "component:proxys-view"
              ) {
                return <ProxysView key={index} />;
              }
              return (
                <ChatMessage
                  key={index}
                  variant={msg.variant}
                  content={msg.content}
                  subVariant={msg.subVariant}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-4">
        <TaskInputBar />
      </div>
    </div>
  );
}
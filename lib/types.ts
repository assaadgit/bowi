// src/lib/types.ts
export interface UserTemplate {
  id: string;
  title: string;
  category: string;
  visibility: 'Public' | 'Private';
  usageCount: number;
}

export interface Automation {
  id: string;
  title: string;
  status: 'Active' | 'Paused' | 'Completed';
  scheduledFor: string; // ISO date string
  frequency: string;
}

export interface UserFile {
  id: string;
  name: string;
  uploadedAt: string; // ISO date string
  updatedAt: string; // ISO date string
  type: string; // e.g., 'PDF', 'CSV'
}

export interface PublicTemplate {
  id: string;
  title: string;
  author: string;
  usageCount: number;
  date: string; // e.g., '12 Mar 25'
  category: string;
  iconName: string; // Name of a Lucide icon
  isPro: boolean;
}

export interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
  timestamp?: string;
}

export interface Step {
  id: string;
  agentName: string;
  agentIcon: React.ReactNode;
  description: string;
}

export interface Screenshot {
  stepNumber: number;
  imageUrl: string; // URL to the screenshot image
  timestamp: string;
  description?: string;
}

export interface TaskData {
  id: string;
  prompt: string;
  status: 'running' | 'completed' | 'failed';
  chatHistory: ChatMessage[];
  steps: { id: string; agentName: string; description: string; }[];
  screenshots: Screenshot[];
}
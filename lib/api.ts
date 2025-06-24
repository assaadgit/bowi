// src/lib/api.ts
import { UserTemplate, Automation, UserFile, PublicTemplate, TaskData } from './types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock implementations - replace with actual fetch calls later
export async function getMyTemplates(): Promise<UserTemplate[]> {
  await delay(800); // Simulate network delay
  return [
    {
      id: 'template_1',
      title: 'E-commerce Product Research',
      category: 'Business',
      visibility: 'Private',
      usageCount: 24
    },
    {
      id: 'template_2',
      title: 'Social Media Content Generator',
      category: 'Marketing',
      visibility: 'Public',
      usageCount: 156
    },
    {
      id: 'template_3',
      title: 'Competitor Analysis Report',
      category: 'Research',
      visibility: 'Private',
      usageCount: 8
    },
    {
      id: 'template_4',
      title: 'Customer Feedback Analysis',
      category: 'Business',
      visibility: 'Public',
      usageCount: 42
    }
  ];
}

export async function getMyAutomations(): Promise<Automation[]> {
  await delay(600);
  return [
    {
      id: 'auto_1',
      title: 'Daily News Digest',
      status: 'Active',
      scheduledFor: '2025-01-15T09:00:00Z',
      frequency: 'Daily'
    },
    {
      id: 'auto_2',
      title: 'Weekly Competitor Check',
      status: 'Paused',
      scheduledFor: '2025-01-20T14:00:00Z',
      frequency: 'Weekly'
    },
    {
      id: 'auto_3',
      title: 'Monthly Sales Report',
      status: 'Completed',
      scheduledFor: '2025-01-01T10:00:00Z',
      frequency: 'Monthly'
    }
  ];
}

export async function getMyFiles(): Promise<UserFile[]> {
  await delay(500);
  return [
    {
      id: 'file_1',
      name: 'product_catalog.pdf',
      uploadedAt: '2025-01-14T10:30:00Z',
      updatedAt: '2025-01-14T10:30:00Z',
      type: 'PDF'
    },
    {
      id: 'file_2',
      name: 'customer_data.csv',
      uploadedAt: '2025-01-13T15:45:00Z',
      updatedAt: '2025-01-14T09:20:00Z',
      type: 'CSV'
    },
    {
      id: 'file_3',
      name: 'marketing_assets.zip',
      uploadedAt: '2025-01-12T14:20:00Z',
      updatedAt: '2025-01-12T14:20:00Z',
      type: 'ZIP'
    },
    {
      id: 'file_4',
      name: 'analysis_report.docx',
      uploadedAt: '2025-01-11T11:15:00Z',
      updatedAt: '2025-01-13T16:30:00Z',
      type: 'DOCX'
    }
  ];
}

export async function getPublicTemplates(category?: string): Promise<PublicTemplate[]> {
  await delay(700);
  
  const allTemplates: PublicTemplate[] = [
    {
      id: 'pub_1',
      title: 'Market Research Assistant',
      author: 'ProxyTeam',
      usageCount: 2847,
      date: '12 Mar 25',
      category: 'Research',
      iconName: 'Search',
      isPro: false
    },
    {
      id: 'pub_2',
      title: 'Content Creation Suite',
      author: 'ContentPro',
      usageCount: 1923,
      date: '10 Mar 25',
      category: 'Marketing',
      iconName: 'PenTool',
      isPro: true
    },
    {
      id: 'pub_3',
      title: 'Financial Data Analyzer',
      author: 'FinanceBot',
      usageCount: 1456,
      date: '08 Mar 25',
      category: 'Business',
      iconName: 'TrendingUp',
      isPro: true
    },
    {
      id: 'pub_4',
      title: 'Social Media Scheduler',
      author: 'SocialAI',
      usageCount: 3201,
      date: '15 Mar 25',
      category: 'Marketing',
      iconName: 'Calendar',
      isPro: false
    },
    {
      id: 'pub_5',
      title: 'Academic Paper Helper',
      author: 'EduAssist',
      usageCount: 892,
      date: '05 Mar 25',
      category: 'Research',
      iconName: 'BookOpen',
      isPro: false
    },
    {
      id: 'pub_6',
      title: 'E-commerce Optimizer',
      author: 'ShopBot',
      usageCount: 2156,
      date: '18 Mar 25',
      category: 'Business',
      iconName: 'ShoppingCart',
      isPro: true
    }
  ];

  if (!category || category === 'All') {
    return allTemplates;
  }

  return allTemplates.filter(template => template.category === category);
}

export async function getTaskData(taskId: string): Promise<TaskData> {
  await delay(400);
  
  return {
    id: taskId,
    prompt: 'Analyze the latest trends in AI technology and create a comprehensive report',
    status: 'running',
    chatHistory: [
      {
        role: 'user',
        content: 'Analyze the latest trends in AI technology and create a comprehensive report'
      },
      {
        role: 'agent',
        content: 'I\'ll help you analyze the latest AI technology trends and create a comprehensive report. Let me start by gathering information from various sources and organizing the data.'
      },
      {
        role: 'agent',
        content: 'I\'m currently researching the following areas:\n\n• Machine Learning advancements\n• Natural Language Processing developments\n• Computer Vision innovations\n• AI Ethics and Governance\n• Industry adoption patterns\n\nThis will take a few minutes to complete thoroughly.'
      }
    ],
    steps: [
      {
        id: 'step_1',
        agentName: 'Research Agent',
        description: 'Gathering data from technology news sources and research papers'
      },
      {
        id: 'step_2',
        agentName: 'Analysis Agent',
        description: 'Processing and categorizing collected information'
      },
      {
        id: 'step_3',
        agentName: 'Report Agent',
        description: 'Structuring findings into comprehensive report format'
      }
    ],
    screenshots: [] // Will be populated by WebSocket updates
  };
}

export async function createTask(prompt: string): Promise<{ taskId: string }> {
  await delay(1000); // Simulate API call
  console.log(`API: Creating task with prompt: "${prompt}"`);
  const newTaskId = `task_${Date.now()}`;
  return { taskId: newTaskId };
}
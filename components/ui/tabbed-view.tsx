'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { DataTableView } from '@/components/ui/data-table-view';
import { TemplateCard } from '@/components/ui/template-card';
import { Alert } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type TabType = 'automations' | 'templates' | 'files';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'automations', label: 'Automations', icon: 'zap' },
  { id: 'templates', label: 'Templates', icon: 'refresh' },
  { id: 'files', label: 'Files', icon: 'file' }
];

// Mock data for automations
const mockAutomations = [
  {
    id: '1',
    title: 'Daily News Digest',
    status: 'Active',
    scheduledFor: '2025-01-09 09:00:00 UTC',
    frequency: 'Daily'
  },
  {
    id: '2',
    title: 'Weekly Sales Report',
    status: 'Paused',
    scheduledFor: '2025-01-13 10:00:00 UTC',
    frequency: 'Weekly'
  },
  {
    id: '3',
    title: 'Competitor Price Check',
    status: 'Active',
    scheduledFor: '2025-01-09 14:30:00 UTC',
    frequency: 'Twice Daily'
  },
  {
    id: '4',
    title: 'Social Media Backup',
    status: 'Error',
    scheduledFor: '2025-01-08 23:00:00 UTC',
    frequency: 'Daily'
  }
];

// Mock data for templates
const mockTemplates = [
  {
    id: '1',
    title: 'Comprehensive Stock Analysis',
    category: 'Business',
    visibility: 'Public',
    usageCount: 1247
  },
  {
    id: '2',
    title: 'Social Media Content Generator',
    category: 'Marketing',
    visibility: 'Private',
    usageCount: 892
  },
  {
    id: '3',
    title: 'Research Paper Summarizer',
    category: 'Research',
    visibility: 'Public',
    usageCount: 2156
  },
  {
    id: '4',
    title: 'E-commerce Product Optimizer',
    category: 'Business',
    visibility: 'Public',
    usageCount: 634
  }
];

// Mock data for files
const mockFiles = [
  {
    id: '1',
    name: 'quarterly-report.pdf',
    uploadedAt: '2025-01-08 14:23:00 UTC',
    updatedAt: '2025-01-08 14:23:00 UTC',
    type: 'PDF'
  },
  {
    id: '2',
    name: 'customer-data.csv',
    uploadedAt: '2025-01-08 11:45:00 UTC',
    updatedAt: '2025-01-08 16:12:00 UTC',
    type: 'CSV'
  },
  {
    id: '3',
    name: 'presentation-slides.pptx',
    uploadedAt: '2025-01-07 09:30:00 UTC',
    updatedAt: '2025-01-07 09:30:00 UTC',
    type: 'PowerPoint'
  },
  {
    id: '4',
    name: 'analysis-results.xlsx',
    uploadedAt: '2025-01-07 16:18:00 UTC',
    updatedAt: '2025-01-08 10:22:00 UTC',
    type: 'Excel'
  }
];

// Mock data for template hub
const mockTemplateHub = [
  {
    id: '1',
    title: 'Comprehensive Stock Analysis',
    author: 'Convergence',
    usageCount: 1247,
    date: '2025-01-05',
    category: 'Business',
    isPro: false,
    icon: 'trendingUp'
  },
  {
    id: '2',
    title: 'Social Media Scheduler',
    author: 'Convergence',
    usageCount: 892,
    date: '2025-01-03',
    category: 'Marketing',
    isPro: true,
    icon: 'calendar'
  },
  {
    id: '3',
    title: 'Research Assistant',
    author: 'Convergence',
    usageCount: 2156,
    date: '2025-01-02',
    category: 'Research',
    isPro: false,
    icon: 'search'
  },
  {
    id: '4',
    title: 'Email Campaign Builder',
    author: 'Convergence',
    usageCount: 634,
    date: '2025-01-01',
    category: 'Marketing',
    isPro: true,
    icon: 'mail'
  },
  {
    id: '5',
    title: 'Data Visualization Tool',
    author: 'Convergence',
    usageCount: 1523,
    date: '2024-12-28',
    category: 'Analytics',
    isPro: false,
    icon: 'barChart'
  },
  {
    id: '6',
    title: 'Content Optimizer',
    author: 'Convergence',
    usageCount: 789,
    date: '2024-12-25',
    category: 'Content',
    isPro: true,
    icon: 'edit'
  }
];

const categories = ['All', 'Business', 'Marketing', 'Research', 'Analytics', 'Content', 'Entertainment'];

export function TabbedView() {
  const [activeTab, setActiveTab] = useState<TabType>('automations');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const automationColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'scheduledFor', label: 'Scheduled For (UTC)', sortable: true },
    { key: 'frequency', label: 'Frequency', sortable: false }
  ];

  const templateColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'visibility', label: 'Visibility', sortable: true },
    { key: 'usageCount', label: 'Usage Count', sortable: true }
  ];

  const fileColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'uploadedAt', label: 'Uploaded At', sortable: true },
    { key: 'updatedAt', label: 'Updated At', sortable: true },
    { key: 'type', label: 'Type', sortable: true }
  ];

  const renderAutomationsView = () => (
    <DataTableView
      title="Automations View"
      searchPlaceholder="Search automation title..."
      columns={automationColumns}
      data={mockAutomations}
      onSearch={(query) => console.log('Search automations:', query)}
      onSort={(column, direction) => console.log('Sort automations:', column, direction)}
      onFilter={() => console.log('Filter automations')}
    />
  );

  const renderTemplatesView = () => (
    <DataTableView
      title="My Templates"
      searchPlaceholder="Search template title..."
      columns={templateColumns}
      data={mockTemplates}
      onSearch={(query) => console.log('Search templates:', query)}
      onSort={(column, direction) => console.log('Sort templates:', column, direction)}
      onFilter={() => console.log('Filter templates')}
    />
  );

  const renderTemplateHubView = () => {
    const filteredTemplates = selectedCategory === 'All' 
      ? mockTemplateHub 
      : mockTemplateHub.filter(template => template.category === selectedCategory);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Template Hub</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-surface/80'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              author={template.author}
              usageCount={template.usageCount}
              date={template.date}
              category={template.category}
              isPro={template.isPro}
              icon={template.icon as any}
              onClick={() => console.log('Template clicked:', template.title)}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Icon name="search" size="lg" className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No templates found in this category.</p>
          </div>
        )}
      </div>
    );
  };

  const renderFilesView = () => (
    <div className="space-y-6">
      <Alert variant="warning">
        Files are automatically deleted after 24 hours. Please download any files you wish to keep permanently.
      </Alert>
      
      <DataTableView
        title="My Files"
        searchPlaceholder="Search file name..."
        columns={fileColumns}
        data={mockFiles}
        onSearch={(query) => console.log('Search files:', query)}
        onSort={(column, direction) => console.log('Sort files:', column, direction)}
        onFilter={() => console.log('Filter files')}
        renderRow={(file) => (
          <tr key={file.id} className="border-b border-border hover:bg-surface/50 transition-colors">
            <td className="px-6 py-4">
              <button className="text-primary hover:text-primary/80 transition-colors font-medium">
                {file.name}
              </button>
            </td>
            <td className="px-6 py-4 text-muted-foreground">{file.uploadedAt}</td>
            <td className="px-6 py-4 text-muted-foreground">{file.updatedAt}</td>
            <td className="px-6 py-4 text-muted-foreground">{file.type}</td>
            <td className="px-6 py-4">
              <button 
                className="p-2 rounded-lg hover:bg-background/50 transition-colors"
                onClick={() => console.log('Download file:', file.name)}
              >
                <Icon name="download" size="sm" className="text-muted-foreground hover:text-foreground" />
              </button>
            </td>
          </tr>
        )}
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'automations':
        return renderAutomationsView();
      case 'templates':
        return activeTab === 'templates' ? renderTemplateHubView() : renderTemplatesView();
      case 'files':
        return renderFilesView();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            )}
          >
            <Icon name={tab.icon as any} size="sm" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
}
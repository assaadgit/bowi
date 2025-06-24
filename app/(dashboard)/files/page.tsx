'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyFiles } from '@/lib/api';
import { UserFile } from '@/lib/types';
import { GenericDataTableView } from '@/components/ui/data-table';
import { Icon } from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { TableRowSkeleton } from '@/components/ui/skeleton-loader';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: files, isLoading, isError, error } = useQuery({
    queryKey: ['myFiles'],
    queryFn: getMyFiles,
  });

  // Filter files based on search term
  const filteredFiles = files?.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.type.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'fileText';
      case 'csv':
        return 'table';
      case 'zip':
        return 'archive';
      case 'docx':
        return 'fileText';
      default:
        return 'file';
    }
  };

  const handleUploadFile = () => {
    toast.success('File upload started!', {
      description: 'Select files to upload to your workspace.',
    });
    console.log('Upload file clicked');
  };

  const handleDownloadFile = (file: UserFile) => {
    toast.success('Download started', {
      description: `Downloading "${file.name}"`,
    });
    console.log('Download file:', file.id);
  };

  const columns = [
    {
      key: 'name',
      label: 'File Name',
      render: (file: UserFile) => (
        <div className="flex items-center gap-3">
          <Icon name={getFileIcon(file.type)} size="sm" className="text-muted-foreground" />
          <button 
            className="font-medium text-foreground hover:text-primary transition-colors text-left"
            onClick={() => handleDownloadFile(file)}
          >
            {file.name}
          </button>
        </div>
      )
    },
    {
      key: 'uploadedAt',
      label: 'Uploaded At',
      render: (file: UserFile) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(file.uploadedAt), 'MMM dd, yyyy HH:mm')}
        </span>
      )
    },
    {
      key: 'updatedAt',
      label: 'Updated At',
      render: (file: UserFile) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(file.updatedAt), 'MMM dd, yyyy HH:mm')}
        </span>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (file: UserFile) => (
        <span className="text-sm text-muted-foreground font-mono">{file.type}</span>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (file: UserFile) => (
        <button 
          className="p-2 hover:bg-background/50 rounded-lg transition-colors"
          onClick={() => handleDownloadFile(file)}
        >
          <Icon name="download" size="sm" className="text-muted-foreground hover:text-foreground" />
        </button>
      )
    }
  ];

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <Icon name="alertCircle" size="lg" className="text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to Load Files</h3>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Warning Alert */}
        <Alert className="border-yellow-500/20 bg-yellow-500/10">
          <Icon name="alertTriangle" size="sm" className="text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            Files are automatically deleted after 24 hours. Please download any files you wish to keep permanently.
          </AlertDescription>
        </Alert>

        <GenericDataTableView
          title="My Files"
          description="Manage your uploaded files and documents"
          data={filteredFiles}
          columns={columns}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search files..."
          emptyStateTitle="No files found"
          emptyStateDescription="Upload your first file to get started."
          primaryAction={{
            label: "Upload File",
            onClick: handleUploadFile
          }}
          loadingComponent={
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <TableRowSkeleton key={index} />
              ))}
            </div>
          }
          emptyComponent={
            <EmptyState
              icon="upload"
              title="No files found"
              description="Upload files to your workspace to use them in your automations and templates. Supported formats include PDF, CSV, DOCX, and more."
              actionLabel="Upload File"
              onAction={handleUploadFile}
            />
          }
        />
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import { TaskData, ChatMessage, Screenshot } from '../types';

// Mock WebSocket server URL - replace with actual server URL
const WEBSOCKET_URL = 'ws://localhost:8001';

export function useTaskWebSocket(taskId: string) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!taskId) return;

    // Initialize socket connection
    socketRef.current = io(WEBSOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    const socket = socketRef.current;

    // Join the specific task room
    socket.emit('join_task_room', taskId);

    // Handle new chat messages
    const handleNewMessage = (message: ChatMessage) => {
      queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
        if (!oldData) return oldData;
        return { 
          ...oldData, 
          chatHistory: [...oldData.chatHistory, message] 
        };
      });
    };

    // Handle step updates
    const handleStepUpdate = (stepUpdate: { stepId: string; status: string; description?: string }) => {
      queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
        if (!oldData) return oldData;
        
        const updatedSteps = oldData.steps.map(step => 
          step.id === stepUpdate.stepId 
            ? { ...step, description: stepUpdate.description || step.description }
            : step
        );
        
        return { ...oldData, steps: updatedSteps };
      });
    };

    // Handle screenshot updates
    const handleScreenshotUpdate = (screenshot: Screenshot) => {
      queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
        if (!oldData) return oldData;
        
        // Check if screenshot already exists, if not add it
        const existingScreenshot = oldData.screenshots.find(s => s.stepNumber === screenshot.stepNumber);
        if (existingScreenshot) {
          return oldData; // Don't add duplicate
        }
        
        return { 
          ...oldData, 
          screenshots: [...oldData.screenshots, screenshot].sort((a, b) => a.stepNumber - b.stepNumber)
        };
      });
    };

    // Handle task status updates
    const handleTaskStatusUpdate = (statusUpdate: { status: 'running' | 'completed' | 'failed' }) => {
      queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
        if (!oldData) return oldData;
        return { ...oldData, status: statusUpdate.status };
      });
    };

    // Set up event listeners
    socket.on('new_message', handleNewMessage);
    socket.on('step_update', handleStepUpdate);
    socket.on('screenshot_update', handleScreenshotUpdate);
    socket.on('task_status_update', handleTaskStatusUpdate);

    // Handle connection events
    socket.on('connect', () => {
      console.log(`Connected to WebSocket for task ${taskId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from WebSocket for task ${taskId}`);
    });

    socket.on('connect_error', (error) => {
      console.warn('WebSocket connection error:', error);
      // In a real app, you might want to show a toast notification
      // or implement reconnection logic
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.off('new_message', handleNewMessage);
        socket.off('step_update', handleStepUpdate);
        socket.off('screenshot_update', handleScreenshotUpdate);
        socket.off('task_status_update', handleTaskStatusUpdate);
        socket.off('connect');
        socket.off('disconnect');
        socket.off('connect_error');
        socket.emit('leave_task_room', taskId);
        socket.disconnect();
      }
    };
  }, [taskId, queryClient]);

  // Simulate real-time updates for demo purposes
  useEffect(() => {
    if (!taskId) return;

    // Simulate incoming messages and screenshots after a delay
    const simulateUpdates = () => {
      const demoMessages: ChatMessage[] = [
        {
          role: 'agent',
          content: 'Starting browser automation process...',
          timestamp: new Date().toISOString(),
        },
        {
          role: 'agent',
          content: 'Navigating to target website and analyzing page structure.',
          timestamp: new Date(Date.now() + 2000).toISOString(),
        },
        {
          role: 'agent',
          content: 'Extracting data and processing information. This may take a few moments.',
          timestamp: new Date(Date.now() + 4000).toISOString(),
        },
      ];

      const demoScreenshots: Screenshot[] = [
        {
          stepNumber: 1,
          imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
          timestamp: new Date(Date.now() + 1000).toISOString(),
          description: 'Initial page load',
        },
        {
          stepNumber: 2,
          imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          timestamp: new Date(Date.now() + 3000).toISOString(),
          description: 'Form interaction',
        },
        {
          stepNumber: 3,
          imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
          timestamp: new Date(Date.now() + 5000).toISOString(),
          description: 'Data extraction complete',
        },
      ];

      // Simulate messages coming in over time
      demoMessages.forEach((message, index) => {
        setTimeout(() => {
          queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
            if (!oldData) return oldData;
            const messageExists = oldData.chatHistory.some(msg => msg.content === message.content);
            if (messageExists) return oldData;
            return { 
              ...oldData, 
              chatHistory: [...oldData.chatHistory, message] 
            };
          });
        }, (index + 1) * 3000);
      });

      // Simulate screenshots coming in over time
      demoScreenshots.forEach((screenshot, index) => {
        setTimeout(() => {
          queryClient.setQueryData(['task', taskId], (oldData: TaskData | undefined) => {
            if (!oldData) return oldData;
            const screenshotExists = oldData.screenshots.some(s => s.stepNumber === screenshot.stepNumber);
            if (screenshotExists) return oldData;
            return { 
              ...oldData, 
              screenshots: [...oldData.screenshots, screenshot].sort((a, b) => a.stepNumber - b.stepNumber)
            };
          });
        }, (index + 1) * 4000);
      });
    };

    // Start simulation after a short delay
    const timeoutId = setTimeout(simulateUpdates, 2000);

    return () => clearTimeout(timeoutId);
  }, [taskId, queryClient]);
}
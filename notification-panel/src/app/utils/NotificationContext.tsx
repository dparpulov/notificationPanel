"use client";

import { useState, useEffect, useCallback, FC, ReactNode, useContext, createContext } from 'react';
import { NewNotificationValues, Notification } from '../types';
import { useToast } from './ToastContext';
import { notificationService } from '../services/notification-service';

interface NotificationContextType {
  notifications: Notification[];
  error: string | null;
  isLoading: boolean;
  createNotification: (newNotification: NewNotificationValues) => Promise<Notification | undefined>;
  updateNotification: (id: string, isRead: boolean) => Promise<Notification>;
  deleteNotification: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedNotifications = await notificationService.getAll();
      setNotifications(fetchedNotifications);
      setError(null);
      return fetchedNotifications;
    } catch (err) {
      console.log(err);
      setError('Failed to fetch notifications');
      toast.error('Failed to fetch notifications');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createNotification = useCallback(async (newNotification: NewNotificationValues) => {
    setIsLoading(true);
    try {
      const createdNotification = await notificationService.create(newNotification);
      if (createdNotification) {
        setNotifications((prev) => [...prev, createdNotification]);
      }
      setError(null);
      toast.success('Notification created successfully');
      return createdNotification;
    } catch (err) {
      console.log("NotificationContext ", err);
      setError('Failed to create notifications');
      toast.error('Failed to create notification');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const updateNotification = useCallback(async (id: string, isRead: boolean) => {
    setIsLoading(true);
    try {
      const updatedNotification = await notificationService.update(id, isRead);
      if (updatedNotification) {
        setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead } : n));
      }
      setError(null);
      toast.success('Notification updated successfully');
      return updatedNotification;
    } catch (err) {
      console.log(err);
      setError('Failed to update notifications');
      toast.error('Failed to update notification');
      return notifications.find((n) => n.id === id);
    } finally {
      setIsLoading(false);
    }
  }, [toast, notifications]);

  const deleteNotification = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await notificationService.delete(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setError(null);
      toast.success('Notification deleted successfully');
    } catch (err) {
      console.log(err);
      setError('Failed to delete notifications');
      toast.error('Failed to delete notification');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const value = {
    notifications,
    error,
    isLoading,
    createNotification,
    updateNotification,
    deleteNotification,
    refetch: fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
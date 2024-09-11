import { useState, useEffect } from 'react';
import { Notification } from '../types';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add a toast when an error occurs
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-notification');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data || []);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, error };
};
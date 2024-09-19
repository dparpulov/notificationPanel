import { useState, useEffect } from 'react';
import { Notification } from '../types';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Add a toast when an error occurs
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/api/get-notification');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications.');
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, error, isLoading };
};
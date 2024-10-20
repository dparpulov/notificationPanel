import { NewNotificationValues, Notification } from "../types";

export const notificationService = {
  async create(values: NewNotificationValues): Promise<Notification> {
    try {
      // throw new Error('NotificationSerivce: Failed to create notification');
      const response = await fetch('/api/create-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.notification;
    } catch (error) {
      throw error;
    }
  },
  async update(id: string, isRead: boolean) {
    try {
      // throw new Error('NotificationSerivce: Failed to update notification');
      const response = await fetch(`/api/update-notification/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.notification;
    } catch (error) {
      throw error;
    }
  },
  async delete(id: string) {
    try {
      // throw new Error('NotificationSerivce: Failed to delete notification');
      const response = await fetch(`/api/delete-notification/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.notification;
    } catch (error) {
      throw error;
    }

  },
  async getAll() {
    try {
      const response = await fetch('/api/get-notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.notifications;
    } catch (error) {
      throw error;
    }
  }
};
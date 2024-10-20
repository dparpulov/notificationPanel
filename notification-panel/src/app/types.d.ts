import { NewNotificationValues } from './types.d';
import { NotificationTypes, ToastTypes } from './constants';

export type NotificationType =
	typeof NotificationTypes[keyof typeof NotificationTypes];

interface BaseNotification {
	id: string;
	isRead: boolean;
	type: NotificationType;
};

interface PlatformNotification extends BaseNotification {
	type: typeof NotificationTypes.PLATFORM_UPDATE;
	releaseNumber: string;
}

export interface UserNotification extends BaseNotification {
	type: Exclude<NotificationType, typeof NotificationTypes.PLATFORM_UPDATE>;
	username: string;
	avatarUrl?: string;
}

export type Notification = PlatformNotification | UserNotification;

export type ToastType = typeof ToastTypes[keyof typeof ToastTypes];

type NewPlatformNotificationValues = Omit<PlatformNotification, 'id' | 'isRead'>;
type NewUserNotificationValues = Omit<UserNotification, 'id' | 'isRead'>;
export type NewNotificationValues = NewPlatformNotificationValues | NewUserNotificationValues;
import { NotificationTypes } from './constants';

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

interface UserNotification extends BaseNotification {
	type: Exclude<NotificationType, typeof NotificationTypes.PLATFORM_UPDATE>;
	username: string;
	avatarUrl?: string;
}

export type Notification = PlatformNotification | UserNotification;
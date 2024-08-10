import { NotificationTypes } from "../constants";
import { Notification } from "../types";
import { NotificationCard } from "./notification-card";

export function NotificationOverview({
	notifications,
}: {
	notifications: Notification[];
}) {
	const getNotificationDescription = (
		notification: Notification
	) => {
		switch (notification.type) {
			case NotificationTypes.PLATFORM_UPDATE:
				return "New features - see what's new";
			case NotificationTypes.COMMENT_TAG:
				return `${notification.username} tagged you in a comment`;
			case NotificationTypes.ACCESS_GRANTED:
				return `${notification.username} shared a chat with you`;
			case NotificationTypes.JOIN_WORKSPACE:
				return `${notification.username} joined your workplace`;
		}
	};

	return (
		<div className="flex flex-col items-center w-80 sm:w-96 p-0.5 md:w-auto max-w-lg bg-white shadow-md cursor-pointer max-h-96 overflow-auto">
			{notifications.map(
				(notification: Notification, index) => (
					<NotificationCard
						key={`notification-${index}`}
						{...(notification.type !==
							NotificationTypes.PLATFORM_UPDATE && {
							username: notification.username,
							avatarUrl: notification.avatarUrl,
						})}
						type={notification.type}
						isRead={notification.isRead}
						description={getNotificationDescription(
							notification
						)}
					/>
				)
			)}
		</div>
	);
}

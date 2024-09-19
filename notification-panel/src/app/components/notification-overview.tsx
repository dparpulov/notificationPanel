import { NotificationTypes } from "../constants";
import { Notification, PlatformNotification, UserNotification } from "../types";
import { NotificationCard } from "./notification-card";

const notificationDescriptionMap = {
	[NotificationTypes.PLATFORM_UPDATE]: "New features - see what's new",
	[NotificationTypes.COMMENT_TAG]: (username: string): string =>
		`${username} tagged you in a comment`,
	[NotificationTypes.ACCESS_GRANTED]: (username: string): string =>
		`${username} shared a chat with you`,
	[NotificationTypes.JOIN_WORKSPACE]: (username: string): string =>
		`${username} joined your workplace`,
};

export function NotificationOverview({
	notifications,
}: {
	notifications: Notification[];
}) {
	const getNotificationDescription = (
		notification: PlatformNotification | UserNotification
	) => {
		const description = notificationDescriptionMap[notification.type];

		if (typeof description === 'function' && 'username' in notification) {
			return description(notification.username);
		}

		return description as string;
	};

	if (notifications.length === 0) {
		return (
			<div className="flex flex-col ring-emerald-500 items-center w-36 p-0.5 py-1 bg-white shadow-md">
				<p className="text-emerald-700">No notifications</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center w-80 sm:w-96 p-0.5 md:w-auto max-w-lg max-h-80 bg-white shadow-md cursor-pointer overflow-auto">
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
						description={getNotificationDescription(notification)}
					/>
				)
			)}
		</div>
	);
}

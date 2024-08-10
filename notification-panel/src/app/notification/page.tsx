import { NotificationOverview } from "../components/notification-overview";
import { NotificationTypes } from "../constants";
import { Notification } from "../types";

// Fetch notifications here
const notifications: Notification[] = [
	{
		id: "1",
		isRead: false,
		type: NotificationTypes.PLATFORM_UPDATE,
		releaseNumber: "1.3",
	},
	{
		id: "2",
		isRead: false,
		type: NotificationTypes.ACCESS_GRANTED,
		username: "User 1",
		avatarUrl:
			"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
	},
	{
		id: "3",
		isRead: true,
		type: NotificationTypes.COMMENT_TAG,
		username: "Ivan Georgiev",
		avatarUrl:
			"https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
	},
	{
		id: "4",
		isRead: false,
		type: NotificationTypes.JOIN_WORKSPACE,
		username: "User with very long name",
	},
	{
		id: "4",
		isRead: false,
		type: NotificationTypes.JOIN_WORKSPACE,
		username: "User with very long name",
	},
	{
		id: "4",
		isRead: false,
		type: NotificationTypes.JOIN_WORKSPACE,
		username: "User with very long name",
	},
];

export default function Notifications() {
	return (
		<NotificationOverview notifications={notifications} />

		
	);
}

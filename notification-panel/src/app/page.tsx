"use client";

import { BellIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { NotificationOverview } from "./components/notification-overview";
import { NotificationForm } from "./components/notification-form";
import useNotifications from "./utils/useNotifications";
import Loader from "./components/loader";

// TODO: Delete later static notifications
// const notifications: Notification[] = [
// 	{
// 		id: "1",
// 		isRead: false,
// 		type: NotificationTypes.PLATFORM_UPDATE,
// 		releaseNumber: "1.3",
// 	},
// 	{
// 		id: "2",
// 		isRead: false,
// 		type: NotificationTypes.ACCESS_GRANTED,
// 		username: "User 1",
// 		avatarUrl:
// 			"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
// 	},
// 	{
// 		id: "3",
// 		isRead: true,
// 		type: NotificationTypes.COMMENT_TAG,
// 		username: "Ivan Georgiev",
// 		avatarUrl:
// 			"https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
// 	},
// 	{
// 		id: "4",
// 		isRead: true,
// 		type: NotificationTypes.JOIN_WORKSPACE,
// 		username: "User with very long name",
// 	},
// 	{
// 		id: "5",
// 		isRead: false,
// 		type: NotificationTypes.JOIN_WORKSPACE,
// 		username: "User with very long name",
// 	},
// 	{
// 		id: "6",
// 		isRead: false,
// 		type: NotificationTypes.JOIN_WORKSPACE,
// 		username: "User with very long name",
// 	},
// ];

export default function Home() {
	const { notifications, error, isLoading } = useNotifications();

	return (
		<>
			<Popover.Root>
				<Popover.Trigger asChild>
					<button className="mb-8 bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold py-2 px-2 rounded inline-flex items-center">
						<BellIcon height={24} width={24} />
						<span className="pl-1">
							{
								isLoading ? <Loader /> :
									notifications.length <= 10
										? notifications.length
										: "10+"
							}
						</span>
					</button>
				</Popover.Trigger>

				<Popover.Portal>
					<Popover.Content>
						<NotificationOverview
							notifications={notifications}
						/>
						<Popover.Arrow className="fill-white" />

					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>

			<NotificationForm />
		</>
	);
}

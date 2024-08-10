import * as Dialog from "@radix-ui/react-dialog";
import {
	Cross2Icon,
	BellIcon,
	PlusIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Notification } from "./types";
import { NotificationTypes } from "./constants";
import { NotificationOverview } from "./components/notification-overview";

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
		id: "5",
		isRead: false,
		type: NotificationTypes.JOIN_WORKSPACE,
		username: "User with very long name",
	},
	{
		id: "6",
		isRead: false,
		type: NotificationTypes.JOIN_WORKSPACE,
		username: "User with very long name",
	},
];

export default function Home() {
	// TODO Extra: Move the router to a separate client side component so this one can be server side

	return (
		<>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button className="mb-8 bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold py-2 px-2 rounded inline-flex items-center">
						<BellIcon height={24} width={24} />
						<span className="pl-1">20+</span>
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content>
						<DropdownMenu.Item>
							<NotificationOverview
								notifications={notifications}
							/>
						</DropdownMenu.Item>

						<DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />

						<DropdownMenu.Arrow className="fill-white" />
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</>
	);
}

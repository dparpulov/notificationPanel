"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { NotificationTypes } from "../constants";
import { NotificationType } from "../types";
import {
	GearIcon,
	PersonIcon,
} from "@radix-ui/react-icons";

interface NotificationCardProps {
	type: NotificationType;
	isRead: boolean;
	username?: string;
	avatarUrl?: string;
	description: string;
}

export function NotificationCard({
	type,
	isRead,
	description,
	username,
	avatarUrl,
}: NotificationCardProps) {
	const router = useRouter();

	const handleClick = () => {
		let redirectUrl;
		switch (type) {
			case NotificationTypes.ACCESS_GRANTED:
				redirectUrl = "/chats";
				break;
			case NotificationTypes.COMMENT_TAG:
				redirectUrl = "/comments";
				break;
			case NotificationTypes.JOIN_WORKSPACE:
				redirectUrl = "/workspace";
				break;
			default:
				redirectUrl = "/"; //TODO: remove later
				break;
		}

		router.push(redirectUrl);
	};

	return (
		// TODO: Each type should have a different color
		<div
			onClick={handleClick}
			className={`flex items-center w-full p-4 mb-1 last:mb-0 ${
				isRead ? "bg-gray-300" : "bg-white"
			} shadow-md cursor-pointer hover:bg-emerald-100 hover:text-emerald-800 hover:ring-2 hover:ring-emerald-500 transition-colors`}
		>
			<div className="mr-4">
				<Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
					<Avatar.Image
						className="h-full w-full rounded-[inherit] object-cover"
						src={avatarUrl}
						aria-hidden={true}
					/>
					<Avatar.Fallback
						className="bg-white p-2"
						delayMs={600}
						aria-hidden={true}
					>
						<div>
							{username ? (
								<PersonIcon
									width={24}
									height={24}
									className={"rounded-full"}
								/>
							) : (
								<GearIcon
									width={24}
									height={24}
									className={"rounded-full"}
								/>
							)}
						</div>
					</Avatar.Fallback>
				</Avatar.Root>
			</div>

			<div className="flex-1">{description}</div>

			<button
				onClick={(e) => e.stopPropagation()} // TODO Extra: Option to change status of notification
				className="ml-4 p-2 focus:outline-none hover:ring-2 hover:ring-emerald-500 rounded-full"
				aria-label="Options"
			>
				<DotsVerticalIcon width={24} height={24} />
			</button>
		</div>
	);
}

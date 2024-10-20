"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import * as Avatar from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { NotificationTypes } from "../constants";
import { Notification } from "../types";
import {
	GearIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useToast } from "../utils/ToastContext";
import { useState } from "react";
import useNotifications from "../utils/NotificationContext";

interface NotificationCardProps {
	notification: Notification,
	description: string;
}

export function NotificationCard({
	notification,
	description,
}: NotificationCardProps) {
	const router = useRouter();
	const toast = useToast();
	const [currentNotification, setCurrentNotification] = useState<Notification>(notification);
	const { updateNotification, deleteNotification } = useNotifications();
	const isUserNotification = currentNotification.type !== NotificationTypes.PLATFORM_UPDATE;

	const handleClick = () => {
		if (!currentNotification.isRead) updateNotificationState();

		const routesMap = {
			[NotificationTypes.ACCESS_GRANTED]: "/chats",
			[NotificationTypes.COMMENT_TAG]: "/comments",
			[NotificationTypes.JOIN_WORKSPACE]: "/workspace",
		};

		if (isUserNotification) {
			router.push(routesMap[currentNotification.type]);
			return;
		}

		toast.info(currentNotification.releaseNumber);
	};

	const updateNotificationState = async () => {
		const updatedNotification = await updateNotification(currentNotification.id, !currentNotification.isRead);
		setCurrentNotification(updatedNotification);
	}

	const handleViewClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		updateNotificationState();
	};

	const handleDeleteClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await deleteNotification(currentNotification.id);
	};

	return (
		<div
			onClick={handleClick}
			className={`flex items-center w-full p-4 ${currentNotification.isRead ? "bg-gray-200" : "bg-white"
				} shadow-md cursor-pointer hover:ring-2 hover:ring-emerald-500 mb-1 transition-colors`}
		>
			<div className="mr-4">
				<Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
					{isUserNotification && <Avatar.Image
						className="h-full object-cover"
						src={currentNotification.avatarUrl}
						aria-hidden={true}
					/>}
					<Avatar.Fallback
						className="bg-white p-3"
						aria-hidden={true}
					>
						<div>
							{isUserNotification ? (
								<PersonIcon
									width={24}
									height={24}
								/>
							) : (
								<GearIcon
									width={24}
									height={24}
								/>
							)}
						</div>
					</Avatar.Fallback>
				</Avatar.Root>
			</div>

			<div className="flex-1">{description}</div>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button
						onClick={(e) => e.stopPropagation()}
						className="ml-4 p-2 focus:outline-none hover:ring-2 hover:ring-emerald-500 rounded-full"
						aria-label="Options"
					>
						<DotsVerticalIcon width={24} height={24} />
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content
						className="min-w-[220px] bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
						sideOffset={4}
					>
						<DropdownMenu.Item
							onClick={(e) => handleDeleteClick(e)}
							className="text-sm hover:ring-2 hover:ring-emerald-500 p-5 leading-none flex items-center h-[25px] px-2 select-none outline-none"
						>
							Delete
						</DropdownMenu.Item>
						<DropdownMenu.Item
							onClick={(e) => handleViewClick(e)}
							className="text-sm hover:ring-2 hover:ring-emerald-500 p-5 leading-none flex items-center h-[25px] px-2 select-none outline-none"
						>
							View
						</DropdownMenu.Item>
						<DropdownMenu.Arrow className="fill-white" />
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}

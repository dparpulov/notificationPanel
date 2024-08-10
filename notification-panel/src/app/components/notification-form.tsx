"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
	Cross2Icon,
	PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { NotificationTypes } from "../constants";
import { Notification } from "../types";

export function NotificationForm({}: {}) {
	const [type, setType] = useState(
		NotificationTypes.PLATFORM_UPDATE
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setType(e.target.value as NotificationTypes);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold py-2 px-2 rounded inline-flex items-center">
					<PlusIcon height={24} width={24} />
					<span className="pl-1">Create notification</span>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title className="m-0 font-medium">
						Create notification
					</Dialog.Title>
					<Dialog.Description className="mt-3 mb-5">
						You can create new notifications from here
					</Dialog.Description>
					<fieldset className="mb-4 flex items-center gap-5">
						<label
							className="w-[90px] text-left"
							htmlFor="type"
						>
							Type
						</label>
						<select
							className="bg-gray-50 w-42 border border-gray-300 text-sm rounded-lg block p-2.5"
							id="type"
							name="type"
							value={type}
							onChange={handleChange}
						>
							<option
								value={NotificationTypes.PLATFORM_UPDATE}
							>
								{NotificationTypes.PLATFORM_UPDATE}
							</option>
							<option value={NotificationTypes.COMMENT_TAG}>
								{NotificationTypes.COMMENT_TAG}
							</option>
							<option
								value={NotificationTypes.ACCESS_GRANTED}
							>
								{NotificationTypes.ACCESS_GRANTED}
							</option>
							<option
								value={NotificationTypes.JOIN_WORKSPACE}
							>
								{NotificationTypes.JOIN_WORKSPACE}
							</option>
						</select>
					</fieldset>
					{type == NotificationTypes.PLATFORM_UPDATE && (
						<fieldset className="mb-4 flex items-center gap-5">
							<label
								className="w-[90px] text-left"
								htmlFor="releaseNumber"
							>
								Release number
							</label>
							<input
								className="inline-flex h-[35px] w-36 flex-1 items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
								id="releaseNumber"
								defaultValue="1.2.3"
							/>
						</fieldset>
					)}
					{type != NotificationTypes.PLATFORM_UPDATE && (
						<>
							<fieldset className="mb-4 flex items-center gap-5">
								<label
									className="w-[90px] text-left"
									htmlFor="username"
								>
									Username
								</label>
								<input
									className="inline-flex h-[35px] w-36 flex-1 items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
									id="username"
									defaultValue="John Doe"
								/>
							</fieldset>

							<fieldset className="mb-4 flex items-center gap-5">
								<label
									className="w-[90px] text-left"
									htmlFor="avatar"
								>
									Avatar
								</label>
								<input
									className="inline-flex h-[35px] w-36 flex-1 items-center justify-center rounded-[4px] px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
									id="avatar"
									defaultValue="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
								/>
							</fieldset>
						</>
					)}

					<div className="mt-[25px] flex justify-end">
						<Dialog.Close asChild>
							<button className="bg-emerald-100 hover:bg-emerald-300 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
								Save changes
							</button>
						</Dialog.Close>
					</div>
					<Dialog.Close asChild>
						<button
							className="hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
							aria-label="Close"
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

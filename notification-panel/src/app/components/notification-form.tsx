"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
	Cross2Icon,
	PlusIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { NewNotificationValues } from "../types";
import { NotificationTypes } from "../constants";
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import useNotifications from "../utils/NotificationContext";

const renderPlatformTypeFormFields = (register: UseFormRegister<FieldValues>) => {
	return (
		<fieldset className="mb-4 flex items-center gap-5">
			<label
				className="w-[90px] text-left"
				htmlFor="releaseNumber"
			>
				Release number
			</label>
			<input
				className="inline-flex h-[35px] w-36 flex-1 items-center justify-center px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
				id="releaseNumber"
				placeholder="1.2.3"
				defaultValue="1.2.3"
				{...register('releaseNumber', {
					required: false,
				})}
			/>
		</fieldset>
	);
}

const renderUserTypeFormFields = (register: UseFormRegister<FieldValues>) => {
	return (
		<>
			<fieldset className="mb-4 flex items-center gap-5">
				<label
					className="w-[90px] text-left"
					htmlFor="username"
				>
					Username
				</label>
				<input
					className="inline-flex h-[35px] w-36 flex-1 items-center justify-center px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
					id="username"
					placeholder="John Doe"
					defaultValue="John Doe"
					{...register('username', {
						required: false,
					})}
				/>
			</fieldset>

			<fieldset className="mb-4 flex items-center gap-5">
				<label
					className="w-[90px] text-left"
					htmlFor="avatarUrl"
				>
					Avatar
				</label>
				<input
					className="inline-flex h-[35px] w-36 flex-1 items-center justify-center px-[10px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
					id="avatarUrl"
					placeholder="Image URL"
					defaultValue="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
					{...register('avatarUrl', {
						required: false,
					})}
				/>
			</fieldset>
		</>
	);
}

export function NotificationForm({ }: {}) {
	const [type, setType] = useState(
		NotificationTypes.PLATFORM_UPDATE
	);
	const { createNotification } = useNotifications();

	const { register, unregister, handleSubmit, getValues, formState: { errors } } = useForm();

	useEffect(() => {
		if (type === NotificationTypes.PLATFORM_UPDATE) {
			unregister('username');
			unregister('avatarUrl');
		} else {
			unregister('releaseNumber');
		}
	}, [type, unregister]);

	const onSubmit = async () => {
		const newNotificationValues = getValues() as NewNotificationValues;

		await createNotification(newNotificationValues);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold py-2 px-2 inline-flex items-center">
					<PlusIcon height={24} width={24} />
					<span className="pl-1">Create notification</span>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
					<Dialog.Title className="m-0 font-medium">
						Create notification
					</Dialog.Title>
					<Dialog.Description className="mt-3 mb-5">
						You can create new notifications from here
					</Dialog.Description>
					<form action="POST" onSubmit={handleSubmit(onSubmit)}>
						<fieldset className="mb-4 flex items-center gap-5">
							<label
								className="w-[90px] text-left"
								htmlFor="type"
							>
								Type
							</label>
							<select
								className="bg-gray-50 w-42 border border-gray-300 text-sm block p-2.5"
								id="type"
								value={type}
								{...register('type', {
									required: true,
									onChange(e) { setType(e.target.value) }
								})}
							>
								{Object.values(NotificationTypes).map((type) => (
									<option
										key={type}
										value={type}
									>
										{type}
									</option>
								))}
							</select>
						</fieldset>
						{type === NotificationTypes.PLATFORM_UPDATE ? renderPlatformTypeFormFields(register) : renderUserTypeFormFields(register)}
						<div className="mt-[25px] flex justify-end">
							<button
								type="submit"
								className="bg-emerald-100 hover:bg-emerald-300 focus:shadow-green inline-flex h-[35px] items-center justify-center px-4 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
								Create notification
							</button>
						</div>
					</form>

					<Dialog.Close asChild>
						<button
							className="hover:bg-emerald-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

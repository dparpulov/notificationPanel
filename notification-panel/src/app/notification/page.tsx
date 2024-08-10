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


    // <Dialog.Root>
      //   <Dialog.Trigger asChild>
      //     <button className="bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold py-2 px-2 rounded inline-flex items-center">
      //       <PlusIcon height={24} width={24} />
      //       <span className="pl-1">Create notification</span>
      //     </button>
      //   </Dialog.Trigger>
      //   <Dialog.Portal>
      //     <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      //     <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
      //       <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
      //         Create notification
      //       </Dialog.Title>
      //       <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
      //         Descritpion here
      //       </Dialog.Description>
      //       <fieldset className="mb-[15px] flex items-center gap-5">
      //         <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="type">
      //           Type
      //         </label>
      //         <select
      //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      //           id="type"
      //           name="type"
      //         >
      //           <option value="platform update">Platform update</option>
      //           <option value="comments tag">Comments tag</option>
      //           <option value="access granted">Access granted</option>
      //           <option value="join workspace">Join workspace</option>
      //         </select>
      //       </fieldset>
      //       <fieldset className="mb-[15px] flex items-center gap-5">
      //         <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="username">
      //           Username
      //         </label>
      //         <input
      //           className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      //           id="username"
      //           defaultValue="@peduarte"
      //         />
      //       </fieldset>
      //       <fieldset className="mb-[15px] flex items-center gap-5">
      //         <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="releaseNumber">
      //           Release number
      //         </label>
      //         <input
      //           className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
      //           id="releaseNumber"
      //           defaultValue="@peduarte"
      //         />
      //       </fieldset>
      //       <div className="mt-[25px] flex justify-end">
      //         <Dialog.Close asChild>
      //           <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
      //             Save changes
      //           </button>
      //         </Dialog.Close>
      //       </div>
      //       <Dialog.Close asChild>
      //         <button
      //           className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
      //           aria-label="Close"
      //         >
      //           <Cross2Icon />
      //         </button>
      //       </Dialog.Close>
      //     </Dialog.Content>
      //   </Dialog.Portal>
      // </Dialog.Root>
	);
}

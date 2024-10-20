"use client";

import * as Popover from "@radix-ui/react-popover";
import { BellIcon } from "@radix-ui/react-icons";
import Loader from "./loader";
import { NotificationOverview } from "./notification-overview";
import useNotifications from "../utils/NotificationContext";

export default function NotificationEntry() {
  const { notifications, error, isLoading } = useNotifications();

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="mb-8 bg-white hover:bg-emerald-100 hover:text-emerald-800 font-bold p-2 inline-flex items-center">
          <BellIcon height={24} width={24} />
          <span className="pl-2">
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
  );
}
import { NotificationForm } from "./components/notification-form";
import NotificationEntry from "./components/notification-entry";
import { ToastProvider } from "./utils/ToastContext";
import { NotificationsProvider } from "./utils/NotificationContext";

export default function Home() {
	return (
		<ToastProvider>
			<NotificationsProvider>
				<NotificationEntry />
				<NotificationForm />
			</NotificationsProvider>
		</ToastProvider>
	);
}

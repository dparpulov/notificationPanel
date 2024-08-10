import prisma from '../lib/prisma';


export async function NotificationCreate(notification) {
	await prisma.notification.create({
    data: {
      type: notification.type,
      releaseNumber: notification?.content,
      username: notification?.username,
      avatarUrl: notification?.avatarUrl
    },
  });
}

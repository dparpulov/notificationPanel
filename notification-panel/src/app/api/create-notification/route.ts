import { NotificationTypes } from '@/app/constants';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// TODO move schemas out of this route file?
const BaseNotificationSchema = z.object({
  type: z.nativeEnum(NotificationTypes),
});

const PlatformNotificationSchema = BaseNotificationSchema.extend({
  type: z.literal(NotificationTypes.PLATFORM_UPDATE),
  releaseNumber: z.string().min(1, 'Release number is required'),
});

const UserNotificationSchema = BaseNotificationSchema.extend({
  type: z.string().refine((value) => value !== NotificationTypes.PLATFORM_UPDATE, {
    message: 'Type cannot be PLATFORM_UPDATE',
  }),
  username: z.string().min(1, 'Username is required'),
  avatarUrl: z.string().url().optional(),
});

const NotificationSchema = z.union([PlatformNotificationSchema, UserNotificationSchema]);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const notification = await prisma.notification.create({
      data: NotificationSchema.parse(data),
    });

    return new Response(JSON.stringify({ message: 'Notification created', notification }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Validation error', details: error.errors }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
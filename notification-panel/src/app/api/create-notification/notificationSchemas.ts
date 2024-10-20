import { NotificationTypes } from '@/app/constants';
import { z } from 'zod';

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
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export const NotificationSchema = z.union([PlatformNotificationSchema, UserNotificationSchema]);

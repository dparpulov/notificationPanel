import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const NotificationSchema = z.object({
  id: z.string().min(1, 'Notification ID is required'),
  isRead: z.boolean({ message: 'Notification read status must be a boolean' }),
});

// TODO Look into why this fails on production as well as delete-notification
export async function PATCH(request: NextRequest, { params }: {
  params: {
    id: string,
  }
}) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 });
    }

    const validatedData = NotificationSchema.parse({ id, ...body });

    const notification = await prisma.notification.update({
      where: { id: validatedData.id },
      data: { isRead: validatedData.isRead },
    });

    return NextResponse.json({ message: 'Notification updated', notification }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors.map((err) => err.message) },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
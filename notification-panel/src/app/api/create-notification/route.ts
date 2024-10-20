import { z } from 'zod';
import { NotificationSchema } from './notificationSchemas';
import prisma from '../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const notification = await prisma.notification.create({
      data: NotificationSchema.parse(data),
    });

    return NextResponse.json({ message: 'Notification created', notification }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
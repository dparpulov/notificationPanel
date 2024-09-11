import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany();

    return new Response(JSON.stringify(notifications), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch notifications.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
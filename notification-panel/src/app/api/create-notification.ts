import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CreateNotification(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    // const post = await prisma.notification.create({
    //   data: {
    //     type: data.type,
    //     releaseNumber: data?.content,
    //     username: data?.username,
    //     avatarUrl: data?.avatarUrl
    //   },
    // });

    // res.status(201).json(post);
  } else {
    res.status(405).end();
  }
}
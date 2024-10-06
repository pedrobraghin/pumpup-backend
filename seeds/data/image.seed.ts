import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const createImages = async () => {
  const images = [
    {
      publicId: uuidv4(),
      assetId: uuidv4(),
      url: 'https://example.com/image1.jpg',
      bytes: 123456,
      format: 'jpeg',
    },
    {
      publicId: uuidv4(),
      assetId: uuidv4(),
      url: 'https://example.com/image2.jpg',
      bytes: 654321,
      format: 'png',
    },
  ];

  await prisma.image.createMany({
    data: images,
  });
};

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrains = async () => {
  const allUsers = await prisma.user.findMany();

  const trains = allUsers.flatMap((user) => [
    {
      name: `Treino A - ${user.name}`,
      userId: user.id,
      weekday: 1,
    },
    {
      name: `Treino B - ${user.name}`,
      userId: user.id,
      weekday: 3,
    },
  ]);

  await prisma.train.createMany({
    data: trains,
  });
};

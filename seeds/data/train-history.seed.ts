import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrainHistories = async () => {
  const users = await prisma.user.findMany();
  const trains = await prisma.train.findMany();

  const trainHistories = users.flatMap((user) =>
    trains
      .filter((train) => train.userId === user.id)
      .flatMap((train) => [
        {
          userId: user.id,
          trainId: train.id,
          duration: 30,
          volume: 150.0,
        },
        {
          userId: user.id,
          trainId: train.id,
          duration: 45,
          volume: 200.0,
        },
      ]),
  );

  await prisma.trainHistory.createMany({
    data: trainHistories,
  });
};

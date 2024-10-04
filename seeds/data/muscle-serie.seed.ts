import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMuscleSeries = async () => {
  const users = await prisma.user.findMany();
  const exercises = await prisma.exercise.findMany();

  const muscleSeries = users.flatMap((user) =>
    exercises.map((exercise) => ({
      userId: user.id,
      exerciseId: exercise.id,
      weight: 50.0,
      repetitionsCount: 10,
      type: 1,
    })),
  );

  await prisma.muscleSerie.createMany({
    data: muscleSeries,
  });
};

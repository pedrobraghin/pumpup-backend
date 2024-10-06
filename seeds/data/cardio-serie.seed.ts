import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCardioSeries = async () => {
  const users = await prisma.user.findMany();
  const exercises = await prisma.exercise.findMany();

  const cardioSeries = users.flatMap((user) =>
    exercises.map((exercise) => ({
      userId: user.id,
      exerciseId: exercise.id,
      distance: 5.0,
      averageSpeed: 10.0,
      maxSpeed: 15.0,
      intensity: 1,
      duration: 30,
    })),
  );

  await prisma.cardioSerie.createMany({
    data: cardioSeries,
  });
};

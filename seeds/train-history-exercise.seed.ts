import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrainHistoryExercises = async () => {
  const users = await prisma.user.findMany();
  const trainHistories = await prisma.trainHistory.findMany();
  const exercises = await prisma.exercise.findMany();

  const trainHistoryExercises = users.flatMap((user) =>
    trainHistories.flatMap((trainHistory) =>
      exercises.map((exercise) => ({
        userId: user.id,
        trainHistoryId: trainHistory.id,
        exerciseId: exercise.id,
        pauseTime: 60,
        seriesCount: 3,
      })),
    ),
  );

  await prisma.trainHistoryExercise.createMany({
    data: trainHistoryExercises,
  });
};

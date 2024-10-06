import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTrainHistoryExerciseSeries = async () => {
  const users = await prisma.user.findMany();
  const trainHistoryExercises = await prisma.trainHistoryExercise.findMany();
  const muscleSeries = await prisma.muscleSerie.findMany();

  const trainHistoryExerciseSeries = users.flatMap((user) => {
    const selectedExercises = trainHistoryExercises.slice(0, 3);

    return selectedExercises.flatMap((trainHistoryExercise) =>
      muscleSeries.slice(0, 3).map((muscleSerie) => ({
        userId: user.id,
        trainHistoryExerciseId: trainHistoryExercise.id,
        exerciseSerieId: muscleSerie.id,
        exerciseType: 'Muscle',
      })),
    );
  });

  await prisma.trainHistoryExerciseSerie.createMany({
    data: trainHistoryExerciseSeries,
  });
};

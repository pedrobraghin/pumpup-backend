import { PrismaClient } from '@prisma/client';
import { users } from '../seeds/users.seed';
import { exercises } from '../seeds/exercises.seed';
import { createTrains } from '../seeds/trains.seed';
import { createMuscleSeries } from '../seeds/muscle-serie.seed';
import { createTrainHistories } from '../seeds/train-history.seed';
import { createCardioSeries } from '../seeds/cardio-serie.seed';
import { createTrainHistoryExercises } from '../seeds/train-history-exercise.seed';
import { createTrainHistoryExerciseSeries } from '../seeds/train-history-exercise-serie.seed';
import { createImages } from '../seeds/image.seed';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.user.createMany({ data: users }),
    prisma.exercise.createMany({ data: exercises }),
  ]);

  await Promise.all([
    createTrains(),
    createTrainHistories(),
    createMuscleSeries(),
    createCardioSeries(),
    createImages(),
  ]);

  await createTrainHistoryExercises();
  await createTrainHistoryExerciseSeries();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

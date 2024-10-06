import { PrismaClient } from '@prisma/client';
import { users } from '../seeds/data/users.seed';
import { exercises } from '../seeds/data/exercises.seed';
import { createTrains } from '../seeds/data/trains.seed';
import { createMuscleSeries } from '../seeds/data/muscle-serie.seed';
import { createTrainHistories } from '../seeds/data/train-history.seed';
import { createCardioSeries } from '../seeds/data/cardio-serie.seed';
import { createTrainHistoryExercises } from '../seeds/data/train-history-exercise.seed';
import { createTrainHistoryExerciseSeries } from '../seeds/data/train-history-exercise-serie.seed';
import { createImages } from '../seeds/data/image.seed';

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

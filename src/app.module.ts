import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { TrainModule } from './modules/train/train.module';
import { MuscleSerieModule } from './modules/muscle-serie/muscle-serie.module';
import { CardioSerieModule } from './modules/cardio-serie/cardio-serie.module';
import { TrainHistoryModule } from './modules/train-history/train-history.module';
import { TrainHistoryExerciseModule } from './modules/train-history-exercise/train-history-exercise.module';
import { TrainHistoryExerciseSerieModule } from './modules/train-history-exercise-serie/train-history-exercise-serie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    PrismaModule,
    UserModule,
    ExerciseModule,
    ImageModule,
    TrainModule,
    MuscleSerieModule,
    CardioSerieModule,
    TrainHistoryModule,
    TrainHistoryExerciseModule,
    TrainHistoryExerciseSerieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

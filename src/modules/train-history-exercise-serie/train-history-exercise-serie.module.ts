import { Module } from '@nestjs/common';
import { TrainHistoryExerciseSerieRepository } from './repository/train-history-exercise-serie.repository';
import { TrainHistoryExerciseSerieService } from './service/train-history-exercise-serie.service';
import { TrainHistoryExerciseSerieController } from './controller/train-history-exercise-serie.controller';
import { UserModule } from '../user/user.module';
import { MuscleSerieModule } from '../muscle-serie/muscle-serie.module';
import { CardioSerieModule } from '../cardio-serie/cardio-serie.module';
import { TrainHistoryExerciseModule } from '../train-history-exercise/train-history-exercise.module';

@Module({
  imports: [
    UserModule,
    MuscleSerieModule,
    CardioSerieModule,
    TrainHistoryExerciseModule,
  ],
  exports: [],
  providers: [
    TrainHistoryExerciseSerieRepository,
    TrainHistoryExerciseSerieService,
  ],
  controllers: [TrainHistoryExerciseSerieController],
})
export class TrainHistoryExerciseSerieModule {}

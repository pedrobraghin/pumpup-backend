import { Module } from '@nestjs/common';
import { TrainHistoryExerciseController } from './controller/train-history-exercise.controller';
import { TrainHistoryExerciseService } from './service/train-history-exercise.service';
import { TrainHistoryExerciseRepository } from './repository/train-history-exercise.repository';
import { TrainHistoryModule } from '../train-history/train-history.module';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
  imports: [TrainHistoryModule, ExerciseModule],
  exports: [],
  providers: [TrainHistoryExerciseService, TrainHistoryExerciseRepository],
  controllers: [TrainHistoryExerciseController],
})
export class TrainHistoryExerciseModule {}

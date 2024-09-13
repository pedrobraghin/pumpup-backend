import { Module } from '@nestjs/common';
import { ExerciseRepository } from './repositories/exercise.repository';
import { ExerciseController } from './controllers/exercise.controller';
import { ExerciseService } from './services/exercise.service';

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [ExerciseRepository, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}

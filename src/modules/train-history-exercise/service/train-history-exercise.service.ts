import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrainHistoryExerciseRepository } from '../repository/train-history-exercise.repository';
import { CreateTrainHistoryExerciseDTO } from '../dtos/requests/create-train-history-exercise.dto';
import { TrainHistoryService } from '../../train-history/service/train-history.service';
import { ExerciseService } from '../../exercise/services/exercise.service';
import { UpdateTrainHistoryExerciseDTO } from '../dtos/requests/update-train-history-exercise.dto';

@Injectable()
export class TrainHistoryExerciseService {
  constructor(
    private trainHistoryExerciseRepository: TrainHistoryExerciseRepository,
    private trainHistoryService: TrainHistoryService,
    private exerciseService: ExerciseService,
  ) {}

  async createTrainHistoryExercise(
    dto: CreateTrainHistoryExerciseDTO,
    userId: string,
  ) {
    await this.trainHistoryService.getTrainHistoryById(
      userId,
      dto.trainHistoryId,
    );

    await this.exerciseService.getExerciseById(dto.exerciseId);

    return this.trainHistoryExerciseRepository.create(dto, userId);
  }

  async getManyById(userId: string, id?: string) {
    const trainHistoryExercise =
      await this.trainHistoryExerciseRepository.getMany(userId, id);

    if (!trainHistoryExercise) {
      throw new NotFoundException('Train history exercise not found');
    }

    return trainHistoryExercise;
  }

  async getById(userId: string, id: string) {
    const trainHistoryExercise =
      await this.trainHistoryExerciseRepository.getById(userId, id);

    if (!trainHistoryExercise) {
      throw new NotFoundException('Train history exercise not found');
    }

    return trainHistoryExercise;
  }

  async update(userId: string, id: string, dto: UpdateTrainHistoryExerciseDTO) {
    await this.getById(userId, id);

    const updatedTrainHistoryExercise =
      await this.trainHistoryExerciseRepository.update(userId, id, dto);

    if (!updatedTrainHistoryExercise) {
      throw new BadRequestException(
        'Could not update this train history exercise',
      );
    }

    return updatedTrainHistoryExercise;
  }

  async delete(userId: string, id: string) {
    await this.getById(userId, id);

    await this.trainHistoryExerciseRepository.delete(userId, id);
  }
}

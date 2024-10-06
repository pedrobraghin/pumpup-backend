import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainHistoryExerciseSerieRepository } from '../repository/train-history-exercise-serie.repository';
import { CreateTrainHistoryExerciseSerieRequestDTO } from '../dtos/requests/create-train-history-exercise-serie-request.dto';
import { MuscleSerieService } from '../../muscle-serie/service/muscle-serie.service';
import { CardioSerieService } from '../../cardio-serie/service/cardio-serie.service';
import { UserService } from '../../user/services/user.service';
import { TrainHistoryExerciseService } from '../../train-history-exercise/service/train-history-exercise.service';
import { QueryTrainHistoryExerciseSerieDTO } from '../dtos/requests/query-train-history-exercise-serie.dto';
import { TrainHistoryExerciseSerieBuilder } from '../builders/train-history-exercise-serie.builder';

@Injectable()
export class TrainHistoryExerciseSerieService {
  constructor(
    private trainHistoryExerciseSerieRepository: TrainHistoryExerciseSerieRepository,
    private muscleSerieService: MuscleSerieService,
    private cardioSerieService: CardioSerieService,
    private userService: UserService,
    private trainHistoryExerciseService: TrainHistoryExerciseService,
  ) {}

  async createTrainHistoryExerciseSerie(
    userId: string,
    dto: CreateTrainHistoryExerciseSerieRequestDTO,
  ) {
    await this.userService.getUser(userId);
    await this.trainHistoryExerciseService.getById(
      userId,
      dto.trainHistoryExerciseId,
    );

    dto.exerciseType === 'cardio'
      ? await this.cardioSerieService.getCardioSerieById(
          dto.exerciseSerieId,
          userId,
        )
      : await this.muscleSerieService.getMuscleSerieById(
          dto.exerciseSerieId,
          userId,
        );

    const trainHistoryExerciseSerie =
      await this.trainHistoryExerciseSerieRepository.create({
        ...dto,
        userId,
      });

    return TrainHistoryExerciseSerieBuilder.buildTrainHistoryExerciseSerieResponse(
      trainHistoryExerciseSerie,
    );
  }

  async filterTrainHistoryExerciseSeries(
    userId: string,
    query: QueryTrainHistoryExerciseSerieDTO,
  ) {
    await this.userService.getUser(userId);

    if (query.trainHistoryExerciseId) {
      await this.trainHistoryExerciseService.getById(
        userId,
        query.trainHistoryExerciseId,
      );
    }

    const trainHistoryExercieSeries =
      await this.trainHistoryExerciseSerieRepository.filterTrainHistoryExerciseSeries(
        userId,
        query,
      );

    return trainHistoryExercieSeries.map((trainHistoryExerciseSerie) => {
      return TrainHistoryExerciseSerieBuilder.buildTrainHistoryExerciseSerieResponse(
        trainHistoryExerciseSerie,
      );
    });
  }

  async getById(id: string, userId: string) {
    await this.userService.getUser(userId);
    const trainHistoryExerciseSerie =
      await this.trainHistoryExerciseSerieRepository.getById(id, userId);

    if (!trainHistoryExerciseSerie) {
      throw new NotFoundException('Train history exercise serie not found');
    }

    return TrainHistoryExerciseSerieBuilder.buildTrainHistoryExerciseSerieResponse(
      trainHistoryExerciseSerie,
    );
  }

  async deleteTrainHistoryExerciseSerie(id: string, userId: string) {
    await this.userService.getUser(userId);
    const trainHistoryExerciseSerie =
      await this.trainHistoryExerciseSerieRepository.getById(id, userId);
    if (!trainHistoryExerciseSerie) {
      throw new NotFoundException('Train history exercise serie not found');
    }

    await this.trainHistoryExerciseSerieRepository.delete(id, userId);
  }
}

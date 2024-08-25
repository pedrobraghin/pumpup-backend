import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainHistoryRepository } from '../repository/train-history.repository';
import { CreateTrainHistoryRequestDTO } from '../dtos/requests/create-train-history-request.dto';
import { TrainService } from '../../train/service/train.service';
import { TrainHistoryBuilder } from '../builders/train-history.builder';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { UpdateTrainHistoryDTO } from '../dtos/requests/update-train-history.dto';

@Injectable()
export class TrainHistoryService {
  constructor(
    private trainHistoryRepository: TrainHistoryRepository,
    private trainService: TrainService,
  ) {}

  async createTrainHistory(userId: string, dto: CreateTrainHistoryRequestDTO) {
    await this.trainService.getTrainById(dto.trainId);
    const trainHistory = await this.trainHistoryRepository.create({
      userId,
      ...dto,
    });

    return TrainHistoryBuilder.buildTrainHistory(trainHistory);
  }

  async getTrainHistoryById(userId: string, id: string) {
    const trainHistory = await this.trainHistoryRepository.getById(userId, id);
    if (!trainHistory) {
      throw new NotFoundException('Train history not found');
    }
    return TrainHistoryBuilder.buildTrainHistory(trainHistory);
  }

  async getByTrainId(userId: string, trainId: string) {
    await this.trainService.getTrainById(trainId);

    const trainHistories = await this.trainHistoryRepository.getByTrainId(
      userId,
      trainId,
    );

    return trainHistories.map((trainHistory) =>
      TrainHistoryBuilder.buildTrainHistory(trainHistory),
    );
  }

  async getTrainHistories(userId: string, paginationQuery: PaginationQueryDTO) {
    const trainHistories = await this.trainHistoryRepository.getTrainHistories(
      userId,
      paginationQuery,
    );

    return trainHistories.map((trainHistory) =>
      TrainHistoryBuilder.buildTrainHistory(trainHistory),
    );
  }

  async updateTrainHistory(
    userId: string,
    id: string,
    dto: UpdateTrainHistoryDTO,
  ) {
    const trainHistory = await this.trainHistoryRepository.getById(userId, id);
    if (!trainHistory) {
      throw new NotFoundException('Train history not found');
    }

    const updatedTrainHistory =
      await this.trainHistoryRepository.updateTrainHistories(
        userId,
        trainHistory.id,
        dto,
      );
    return TrainHistoryBuilder.buildTrainHistory(updatedTrainHistory);
  }

  async deleteTrainHistory(userId: string, id: string) {
    const trainHistory = await this.trainHistoryRepository.getById(userId, id);
    if (!trainHistory) {
      throw new NotFoundException('Train history not found');
    }

    await this.trainHistoryRepository.delete(userId, trainHistory.id);
    return;
  }
}

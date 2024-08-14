import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { UpdateTrainDTO } from '../dtos/requests/update-train.dto';
import { CreateTrainRequestDTO } from '../dtos/requests/create-train-request.dto';

@Injectable()
export class TrainService {
  constructor(private trainRepository: TrainRepository) {}

  async createTrain(data: CreateTrainRequestDTO, userId: string) {
    return await this.trainRepository.create({ ...data, userId });
  }

  async getTrainById(id: string) {
    const train = await this.trainRepository.getById(id);
    if (!train) {
      throw new NotFoundException('Train not found');
    }
    return train;
  }

  async searchTrain(dto: FilterTrainDTO) {
    return this.trainRepository.searchTrain(dto);
  }

  async updateTrain(id: string, data: UpdateTrainDTO) {
    const train = await this.trainRepository.getById(id);
    if (!train) {
      throw new NotFoundException('Train not found');
    }
    return await this.trainRepository.update(train.id, data);
  }

  async deleteTrain(id: string) {
    const train = await this.trainRepository.getById(id);

    if (!train) {
      throw new NotFoundException('Train not found');
    }
    await this.trainRepository.delete(id);
  }
}

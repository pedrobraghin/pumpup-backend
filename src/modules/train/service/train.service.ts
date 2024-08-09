import { Injectable } from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { Train } from '../dtos/train';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';

@Injectable()
export class TrainService {
  constructor(private trainRepository: TrainRepository) {
  }

  async createTrain(data: CreateTrainDTO) {
    return this.trainRepository.create(data);
  }
}

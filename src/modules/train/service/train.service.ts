import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrainRepository } from '../repository/train.repository';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';
import { UserService } from '../../user/services/user.service';
import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { UpdateTrainDTO } from '../dtos/requests/update-train.dto';

@Injectable()
export class TrainService {
  constructor(
    private trainRepository: TrainRepository,
    private userService: UserService,
  ) {}

  async createTrain(data: CreateTrainDTO) {
    const user = await this.userService.getUser(data.userId);
    if (!user) {
      throw new BadRequestException('You must be logged in to create a train');
    }
    return await this.trainRepository.create(data);
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

import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';

@Injectable()
export class TrainRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTrainDTO) {
    return this.prisma.train.create({
      data,
    });
  }
}

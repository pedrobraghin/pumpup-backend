import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrainHistoryExerciseDTO } from '../dtos/requests/create-train-history-exercise.dto';
import { UpdateTrainHistoryExerciseDTO } from '../dtos/requests/update-train-history-exercise.dto';

@Injectable()
export class TrainHistoryExerciseRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrainHistoryExerciseDTO, userId: string) {
    return this.prisma.trainHistoryExercise.create({
      data: { ...dto, userId },
    });
  }

  async getById(userId: string, id: string) {
    return this.prisma.trainHistoryExercise.findUnique({
      where: { id, userId },
    });
  }

  async getMany(userId: string) {
    return this.prisma.trainHistoryExercise.findMany({
      where: {
        userId,
      },
    });
  }

  async getManyByExerciseIdOrTrainHistoryId(userId: string, id: string) {
    return this.prisma.trainHistoryExercise.findMany({
      where: {
        userId,
        OR: [{ exerciseId: id }, { trainHistoryId: id }],
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateTrainHistoryExerciseDTO) {
    return this.prisma.trainHistoryExercise.update({
      where: { userId, id },
      data: dto,
    });
  }

  async delete(userId: string, id: string) {
    return this.prisma.trainHistoryExercise.delete({
      where: { userId, id },
    });
  }
}

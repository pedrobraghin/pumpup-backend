import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrainHistoryExerciseSerieDTO } from '../dtos/requests/create-train-history-exercise-serie.dto';
import { QueryTrainHistoryExerciseSerieDTO } from '../dtos/requests/query-train-history-exercise-serie.dto';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';

@Injectable()
export class TrainHistoryExerciseSerieRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrainHistoryExerciseSerieDTO) {
    return this.prisma.trainHistoryExerciseSerie.create({
      data: dto,
    });
  }

  async getById(id: string, userId: string) {
    return this.prisma.trainHistoryExerciseSerie.findUnique({
      where: { id, userId },
    });
  }

  async filterTrainHistoryExerciseSeries(
    userId: string,
    query: QueryTrainHistoryExerciseSerieDTO,
  ) {
    const { page, limit } = buildPaginationQuery(query);

    return this.prisma.trainHistoryExerciseSerie.findMany({
      where: {
        userId,
        ...(query.exerciseType && { exerciseType: query.exerciseType }),
        ...(query.trainHistoryExerciseId && {
          trainHistoryExerciseId: query.trainHistoryExerciseId,
        }),
      },
      skip: page,
      take: limit,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.trainHistoryExerciseSerie.delete({
      where: { id, userId },
    });
  }
}

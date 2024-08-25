import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrainHistoryDTO } from '../dtos/requests/create-train-history.dto';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';
import { UpdateTrainHistoryDTO } from '../dtos/requests/update-train-history.dto';

@Injectable()
export class TrainHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrainHistoryDTO) {
    return this.prisma.trainHistory.create({
      data: dto,
    });
  }

  async getById(userId: string, id: string) {
    return this.prisma.trainHistory.findUnique({
      where: { id, userId },
    });
  }

  async getByTrainId(userId: string, trainId: string) {
    return this.prisma.trainHistory.findMany({
      where: { userId, trainId },
    });
  }

  async getTrainHistories(userId: string, paginationQuery: PaginationQueryDTO) {
    const { page, limit } = buildPaginationQuery(paginationQuery);
    return this.prisma.trainHistory.findMany({
      where: { userId },
      skip: page,
      take: limit,
    });
  }

  async updateTrainHistories(
    userId: string,
    id: string,
    dto: UpdateTrainHistoryDTO,
  ) {
    return this.prisma.trainHistory.update({
      where: { id, userId },
      data: dto,
    });
  }

  async delete(userId: string, id: string) {
    return this.prisma.trainHistory.delete({
      where: { id, userId },
    });
  }
}

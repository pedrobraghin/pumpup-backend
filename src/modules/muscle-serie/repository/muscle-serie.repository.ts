import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMuscleSerieDTO } from '../dtos/requests/create-muscle-serie.dto';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';
import { UpdateMuscleSerieDTO } from '../dtos/requests/update-muscle-serie.dto';

@Injectable()
export class MuscleSerieRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMuscleSerieDTO) {
    return this.prisma.muscleSerie.create({
      data: dto,
    });
  }

  async getById(id: string, userId: string) {
    return this.prisma.muscleSerie.findUnique({ where: { id, userId } });
  }

  async getMuscleSeries(userId: string, paginationQuery: PaginationQueryDTO) {
    const { page, limit } = buildPaginationQuery(paginationQuery);
    return this.prisma.muscleSerie.findMany({
      where: { userId },
      skip: page,
      take: limit,
    });
  }

  async updateMuscleSeries(
    id: string,
    userId: string,
    data: UpdateMuscleSerieDTO,
  ) {
    return this.prisma.muscleSerie.update({
      where: { userId, id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.muscleSerie.delete({ where: { id, userId } });
  }
}

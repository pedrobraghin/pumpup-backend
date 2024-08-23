import { Injectable } from '@nestjs/common';
import { CreateCardioSerieDTO } from '../dtos/requests/create-cardio-serie.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCardioSerieDTO } from '../dtos/requests/update-cardio-serie.dto';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { Intensity } from '../enums/intensity.enum';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';

@Injectable()
export class CardioSerieRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCardioSerieDTO) {
    return this.prisma.cardioSerie.create({
      data: dto,
    });
  }

  async getById(id: string, userId: string) {
    return this.prisma.cardioSerie.findUnique({ where: { id, userId } });
  }

  async getAll(
    userId: string,
    paginationQuery: PaginationQueryDTO,
    intensity?: Intensity,
  ) {
    const { page, limit } = buildPaginationQuery(paginationQuery);

    return this.prisma.cardioSerie.findMany({
      where: { userId, intensity },
      skip: page,
      take: limit,
    });
  }

  async update(id: string, userId: string, data: UpdateCardioSerieDTO) {
    return this.prisma.cardioSerie.update({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.cardioSerie.delete({
      where: { id, userId },
    });
  }
}

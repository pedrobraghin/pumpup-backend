import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';
import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { buildTrainFilters } from '../utils/build-train-filters.util';
import { UpdateTrainDTO } from '../dtos/requests/update-train.dto';

@Injectable()
export class TrainRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTrainDTO) {
    return this.prisma.train.create({
      data,
    });
  }

  async getById(id: string) {
    return this.prisma.train.findFirst({ where: { id } });
  }

  async searchTrain(dto: FilterTrainDTO) {
    const { filterConditions, paginationQuery } = buildTrainFilters(dto);

    return this.prisma.train.findMany({
      where: filterConditions,
      orderBy: { name: 'asc' },
      skip: paginationQuery.page,
      take: paginationQuery.limit,
    });
  }

  async update(id: string, data: UpdateTrainDTO) {
    return this.prisma.train.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.train.findFirst({ where: { id } });
  }
}

import { PrismaService } from '../../prisma/prisma.service';
import { CreateExerciseDTO } from '../dtos/requests/create-exercise.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseRepository {
  constructor(private prisma: PrismaService) {
  }

  async create(data: CreateExerciseDTO) {
    return this.prisma.exercise.create({
      data: data,
    });
  }

  async getById(id: string) {
    return this.prisma.exercise.findFirst({
      where: { id },
    });
  }

  async getAll() {
    return this.prisma.exercise.findMany({
      orderBy: [
        {
          name: 'asc',
        },
        {
          targetMuscle: 'asc',
        },
      ],
    });
  }

  async getByTargetMuscle(targetMuscle: string) {
    return this.prisma.exercise.findMany({
      where: { targetMuscle: { contains: targetMuscle, mode: 'insensitive' } },
      orderBy: { name: 'asc' },
    });
  }

  async getWithPagination(skip: number, take: number, filters: any) {
    return this.prisma.exercise.findMany({
      skip,
      take,
      where: this.applyInsensitiveFilters(filters),
    });
  }

  async search(name: string, filters: any) {
    return this.prisma.exercise.findMany({
      where: {
        ...this.applyInsensitiveFilters(filters),
        name: { contains: name, mode: 'insensitive' },
      },
      orderBy: { name: 'asc' },
    });
  }

  private applyInsensitiveFilters(filters: any) {
    return Object.keys(filters).reduce((acc, key) => {
      if (typeof filters[key] === 'string') {
        acc[key] = { contains: filters[key], mode: 'insensitive' };
      } else {
        acc[key] = filters[key];
      }
      return acc;
    }, {});
  }
}

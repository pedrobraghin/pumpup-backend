import { PrismaService } from '../../prisma/prisma.service';
import { CreateExerciseDTO } from '../dtos/requests/create-exercise.dto';
import { Injectable } from '@nestjs/common';
import { UpdateExerciseDTO } from '../dtos/requests/update-exercise.dto';
import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';

@Injectable()
export class ExerciseRepository {
  constructor(private prisma: PrismaService) {}

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

  async search(filters: GetExercisesFilterDTO) {
    const { skip, exercisesPerPage, ...filterCriteria } = filters;

    return this.prisma.exercise.findMany({
      where: {
        ...this.applyInsensitiveFilters(filterCriteria),
      },
      skip,
      take: exercisesPerPage,
      orderBy: { name: 'asc' },
    });
  }

  async update(data: UpdateExerciseDTO, id: string) {
    return this.prisma.exercise.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.exercise.delete({ where: { id } });
  }

  private applyInsensitiveFilters(filters: Record<string, any>) {
    return Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [
        key,
        typeof value === 'string'
          ? { contains: value, mode: 'insensitive' }
          : value,
      ]),
    );
  }
}

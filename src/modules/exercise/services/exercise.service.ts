import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { CreateExerciseDTO } from '../dtos/requests/create-exercise.dto';
import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async createExercise(dto: CreateExerciseDTO) {
    return await this.exerciseRepository.create(dto);

    // Have to wait cloudinary integration to make image rules
  }

  async getExerciseById(id: string) {
    const exercise = this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async getByTargetMuscle(targetMuscle: string) {
    return this.exerciseRepository.getByTargetMuscle(targetMuscle);
  }

  async searchExercises(name: string, filters: GetExercisesFilterDTO) {
    if (name || filters) {
      const where: any = {};

      if (filters.difficulty) {
        where.difficulty = Number(filters.difficulty);
      }

      if (filters.type) {
        where.type = filters.type;
      }

      if (filters.targetMuscle) {
        where.targetMuscle = filters.targetMuscle;
      }
      return this.exerciseRepository.search(name, where);
    }

    return this.exerciseRepository.getAll();
  }

  async getWithPagination(
    skip: number,
    take: number,
    filters: GetExercisesFilterDTO,
  ) {
    const pageNumber = (skip - 1) * take;
    const where: any = {};

    if (filters.difficulty) {
      where.difficulty = Number(filters.difficulty);
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.targetMuscle) {
      where.targetMuscle = filters.targetMuscle;
    }
    return this.exerciseRepository.getWithPagination(pageNumber, take, where);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { CreateExerciseDTO } from '../dtos/requests/create-exercise.dto';
import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';
import { UpdateExerciseDTO } from '../dtos/requests/update-exercise.dto';
import { buildExerciseFilters } from '../utils/build-exercises-filter';

@Injectable()
export class ExerciseService {
  // private readonly logger = new Logger('Exercises Controller');

  constructor(private exerciseRepository: ExerciseRepository) {}

  async createExercise(dto: CreateExerciseDTO) {
    return await this.exerciseRepository.create(dto);

    // Have to wait cloudinary integration to make image rules
  }

  async getExerciseById(id: string) {
    const exercise = await this.exerciseRepository.getById(id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async getByTargetMuscle(targetMuscle: string) {
    return this.exerciseRepository.getByTargetMuscle(targetMuscle);
  }

  async getExercises(filters: GetExercisesFilterDTO) {
    const where = buildExerciseFilters(filters);
    if (!where) {
      return this.exerciseRepository.getAll();
    }

    return this.exerciseRepository.search(where);
  }

  async updateExercise(dto: UpdateExerciseDTO, id: string) {
    const exercise = await this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return this.exerciseRepository.update(dto, id);
  }

  async deleteExercise(id: string) {
    const exercise = await this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }
    await this.exerciseRepository.delete(id);
    return;
  }
}

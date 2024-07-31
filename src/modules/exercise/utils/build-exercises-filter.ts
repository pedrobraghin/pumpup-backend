import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';

export function buildExerciseFilters(filters: GetExercisesFilterDTO) {
  const where: Record<string, any> = {};

  if (filters.name) {
    where.name = filters.name;
  }

  if (filters.difficulty) {
    where.difficulty = filters.difficulty;
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.targetMuscle) {
    where.targetMuscle = filters.targetMuscle;
  }

  if (filters.limit) {
    where.limit = filters.limit;
  }

  if (filters.page) {
    if (!where.limit) {
      where.limit = 15;
    }
    where.page = Number(filters.page - 1) * where.limit;
  }
  return where;
}

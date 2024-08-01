import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';
import { paginationItemLimit } from '../../../shared/consts';

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
    if (filters.limit <= 0) {
      filters.limit = paginationItemLimit;
    }
    where.limit = filters.limit;
  }

  if (filters.page) {
    if (filters.page <= 0) {
      filters.page = 1;
    }

    if (!where.limit) {
      where.limit = paginationItemLimit;
    }
    where.page = Number(filters.page - 1) * where.limit;
  }
  return where;
}

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

  if (filters.exercisesPerPage) {
    where.exercisesPerPage = filters.exercisesPerPage;
  }

  if (filters.skip) {
    if (!where.exercisesPerPage) {
      where.exercisesPerPage = 15;
    }
    where.skip = Number(filters.skip - 1) * where.exercisesPerPage;
  }
  return where;
}

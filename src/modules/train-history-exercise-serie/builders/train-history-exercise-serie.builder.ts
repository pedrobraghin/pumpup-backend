import { TrainHistoryExerciseSerie } from '../dtos/train-history-exercise-serie';

export class TrainHistoryExerciseSerieBuilder {
  static buildTrainHistoryExerciseSerieResponse(
    data: TrainHistoryExerciseSerie,
  ) {
    const { id, exerciseSerieId, trainHistoryExerciseId, exerciseType } = data;
    return { id, exerciseSerieId, exerciseType, trainHistoryExerciseId };
  }
}

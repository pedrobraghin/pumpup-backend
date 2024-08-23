import { BuildedTrainHistoryDTO } from '../dtos/responses/builded-train-history.dto';
import { TrainHistory } from '../dtos/train-history';

export class TrainHistoryBuilder {
  static buildTrainHistory(trainHistory: TrainHistory): BuildedTrainHistoryDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...rest } = trainHistory;
    return rest as BuildedTrainHistoryDTO;
  }
}

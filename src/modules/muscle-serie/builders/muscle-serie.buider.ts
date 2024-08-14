import { BuildedMuscleSerieDTO } from '../dtos/responses/builded-muscle-serie.dto';
import { MuscleSerie } from '../dtos/muscle-serie';

export class MuscleSerieBuider {
  static buildMuscle(muscleSerie: MuscleSerie): BuildedMuscleSerieDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...rest } = muscleSerie;
    return rest as BuildedMuscleSerieDTO;
  }
}

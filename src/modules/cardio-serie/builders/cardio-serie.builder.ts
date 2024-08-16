import { BuildedCardioSerieDTO } from '../dtos/responses/builded-cardio-serie.dto';
import { CardioSerie } from '../dtos/cardioSerie';

export class CardioSerieBuider {
  static buildCardio(cardioSerie: CardioSerie): BuildedCardioSerieDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...rest } = cardioSerie;
    return rest as BuildedCardioSerieDTO;
  }
}

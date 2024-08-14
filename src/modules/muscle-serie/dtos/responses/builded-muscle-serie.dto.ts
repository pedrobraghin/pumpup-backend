import { MuscleSerieType } from '../../enums/muscle-serie-type.enum';

export class BuildedMuscleSerieDTO {
  id: string;
  type: MuscleSerieType;
  weight: number;
  repetitionsCount: number;
  exerciseId: string;
  createdAt: Date;
  updatedAt: Date;
}

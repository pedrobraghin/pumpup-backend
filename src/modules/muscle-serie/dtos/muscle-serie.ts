import { MuscleSerieType } from '../enums/muscle-serie-type.enum';

export class MuscleSerie {
  id: string;
  userId: string;
  type: MuscleSerieType;
  weight: number;
  repetitionsCount: number;
  exerciseId: string;
  createdAt: Date;
  updatedAt: Date;
}

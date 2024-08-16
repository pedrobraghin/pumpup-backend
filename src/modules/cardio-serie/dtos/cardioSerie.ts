import { Intensity } from '../enums/intensity.enum';

export class CardioSerie {
  id: string;
  userId: string;
  exerciseId: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  intensity: Intensity;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

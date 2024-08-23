import { Intensity } from '../../enums/intensity.enum';

export interface BuildedCardioSerieDTO {
  id: string;
  exerciseId: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  intensity: Intensity;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

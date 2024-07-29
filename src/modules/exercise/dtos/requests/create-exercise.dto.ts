import { IsInt, IsString } from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  name: string;

  @IsInt()
  difficulty: number;

  @IsString()
  type: 'cardio' | 'muscle';

  @IsString()
  targetMuscle: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}

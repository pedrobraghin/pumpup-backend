import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { ExerciseType } from '../enums/ExerciseType';
import { Difficulty } from '../enums/difficulty.enum';

export class Exercise {
  @ApiResponseProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  difficulty: Difficulty;

  @ApiProperty()
  type: ExerciseType;

  @ApiProperty()
  targetMuscle: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  variation: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;
}

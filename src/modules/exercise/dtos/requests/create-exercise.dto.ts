import { IsIn, IsInt, IsString, IsUrl, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '../../enums/difficulty.enum';
import { ExerciseType } from '../../enums/ExerciseType';

export class CreateExerciseDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(3)
  difficulty: Difficulty;

  @ApiProperty()
  @IsString()
  @IsIn([ExerciseType.CARDIO, ExerciseType.MUSCLE])
  type: ExerciseType;

  @ApiProperty()
  @IsString()
  targetMuscle: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsUrl()
  image: string;
}

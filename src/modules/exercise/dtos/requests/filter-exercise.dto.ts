import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Difficulty } from '../../enums/difficulty.enum';
import { Type } from 'class-transformer';
import { ExerciseType } from '../../enums/ExerciseType';

export class GetExercisesFilterDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(3)
  difficulty?: Difficulty;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn([ExerciseType.CARDIO, ExerciseType.MUSCLE])
  type?: ExerciseType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  targetMuscle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  exercisesPerPage?: number;
}

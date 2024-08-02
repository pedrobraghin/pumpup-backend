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
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class GetExercisesFilterDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
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
  @Sanitize()
  type?: ExerciseType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  targetMuscle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}

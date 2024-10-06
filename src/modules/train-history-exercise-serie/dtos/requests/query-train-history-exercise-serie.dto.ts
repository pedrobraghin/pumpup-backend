import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ExerciseType } from '../../../exercise/enums/ExerciseType';
import { Type } from 'class-transformer';

export class QueryTrainHistoryExerciseSerieDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ExerciseType)
  @Sanitize()
  exerciseType?: ExerciseType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  trainHistoryExerciseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit?: number;
}

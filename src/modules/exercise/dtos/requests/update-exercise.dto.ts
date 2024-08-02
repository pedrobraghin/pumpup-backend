import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty } from '../../enums/difficulty.enum';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class UpdateExerciseDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  difficulty?: Difficulty;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  targetMuscle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  variation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @Sanitize()
  image?: string;
}

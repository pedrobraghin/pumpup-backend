import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Difficulty } from '../../enums/difficulty.enum';
import { ExerciseType } from '../../enums/ExerciseType';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class CreateExerciseDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(3)
  difficulty: Difficulty;

  @ApiProperty()
  @IsString()
  @IsIn([ExerciseType.CARDIO, ExerciseType.MUSCLE])
  @Sanitize()
  type: ExerciseType;

  @ApiProperty()
  @IsString()
  targetMuscle: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  variation: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  description: string;

  @ApiProperty()
  @IsUrl()
  @Sanitize()
  image: string;
}

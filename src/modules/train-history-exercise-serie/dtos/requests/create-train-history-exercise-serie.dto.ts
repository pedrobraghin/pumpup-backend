import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ExerciseType } from '../../../exercise/enums/ExerciseType';

export class CreateTrainHistoryExerciseSerieDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  trainHistoryExerciseId: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  userId: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  exerciseSerieId: string;

  @ApiProperty()
  @IsEnum(ExerciseType)
  @Sanitize()
  exerciseType: ExerciseType;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class CreateTrainHistoryExerciseDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  trainHistoryId: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  exerciseId: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  pauseTime: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  seriesCount: number;
}

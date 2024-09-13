import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateTrainHistoryExerciseDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  pauseTime?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  seriesCount?: number;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetExercisesFilterDTO {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  difficulty?: number;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  targetMuscle?: string;
}

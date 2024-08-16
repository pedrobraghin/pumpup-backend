import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { Weekday } from '../../enums/weekday.enum';

export class UpdateTrainDTO {
  @ApiPropertyOptional()
  @IsString()
  @Sanitize()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  @Sanitize()
  weekday?: Weekday;
}

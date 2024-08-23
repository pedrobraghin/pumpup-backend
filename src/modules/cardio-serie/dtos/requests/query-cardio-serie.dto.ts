import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Intensity } from '../../enums/intensity.enum';

export class QueryCardioSerieDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsEnum(Intensity)
  intensity?: Intensity;
}

import { Intensity } from '../../enums/intensity.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCardioSerieDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  distance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  averageSpeed?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSpeed?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsEnum(Intensity)
  intensity?: Intensity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
}

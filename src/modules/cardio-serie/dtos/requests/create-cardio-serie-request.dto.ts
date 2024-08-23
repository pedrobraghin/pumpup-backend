import { Intensity } from '../../enums/intensity.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class CreateCardioSerieRequestDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  exerciseId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  averageSpeed: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  maxSpeed: number;

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

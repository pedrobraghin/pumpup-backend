import { Intensity } from '../../enums/intensity.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class CreateCardioSerieDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  userId: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  exerciseId: string;

  @ApiProperty()
  @IsDecimal()
  @Min(0)
  distance: number;

  @ApiProperty()
  @IsDecimal()
  @Min(0)
  averageSpeed: number;

  @ApiProperty()
  @IsDecimal()
  @Min(0)
  maxSpeed: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  intensity?: Intensity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
}

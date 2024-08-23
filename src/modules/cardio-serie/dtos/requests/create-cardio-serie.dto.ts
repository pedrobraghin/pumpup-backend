import { Intensity } from '../../enums/intensity.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
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
  @IsEnum(Intensity)
  intensity?: Intensity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
}

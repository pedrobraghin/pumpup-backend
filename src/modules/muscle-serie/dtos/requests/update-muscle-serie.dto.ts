import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { MuscleSerieType } from '../../enums/muscle-serie-type.enum';

export class UpdateMuscleSerieDTO {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(4)
  type?: MuscleSerieType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  repetitionsCount?: number;
}

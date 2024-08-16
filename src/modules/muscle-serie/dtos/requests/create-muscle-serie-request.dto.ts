import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { Type } from 'class-transformer';
import { MuscleSerieType } from '../../enums/muscle-serie-type.enum';

export class CreateMuscleSeriesRequestDTO {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(4)
  type: MuscleSerieType;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  repetitionsCount: number;

  @ApiProperty()
  @IsString()
  @Sanitize()
  exerciseId: string;
}

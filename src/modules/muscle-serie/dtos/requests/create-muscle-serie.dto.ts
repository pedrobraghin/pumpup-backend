import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { MuscleSerieType } from '../../enums/muscle-serie-type.enum';
import { Type } from 'class-transformer';

export class CreateMuscleSerieDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  userId: string;

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

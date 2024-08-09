import { Weekday } from '../../enums/weekday.enum';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrainDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  @Sanitize()
  weekday?: Weekday;

  @ApiProperty()
  @IsString()
  @Sanitize()
  userId: string;
}

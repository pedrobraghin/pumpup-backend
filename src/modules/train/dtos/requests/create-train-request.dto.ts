import { Weekday } from '../../enums/weekday.enum';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainRequestDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(6)
  @Sanitize()
  weekday: Weekday;
}

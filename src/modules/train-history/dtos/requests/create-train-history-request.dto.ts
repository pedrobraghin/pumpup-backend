import { IsInt, IsNumber, IsString, IsUUID } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainHistoryRequestDTO {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @Sanitize()
  trainId: string;

  @ApiProperty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  volume: number;
}

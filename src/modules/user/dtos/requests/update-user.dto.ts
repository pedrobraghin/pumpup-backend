import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  pictureUrl?: string;
}

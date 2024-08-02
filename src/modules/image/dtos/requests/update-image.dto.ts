import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class UpdateImageDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  publicId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  bytes?: number;
}

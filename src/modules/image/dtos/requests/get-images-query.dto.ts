import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class GetImagesQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Sanitize()
  format?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit?: number;
}

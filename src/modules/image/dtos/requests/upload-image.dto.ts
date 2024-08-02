import { IsInt, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sanitize } from '../../../../decorators/Sanitize.decorator';

export class UploadImageDTO {
  @ApiProperty()
  @IsString()
  @Sanitize()
  publicId: string;

  @ApiProperty()
  @IsString()
  @Sanitize()
  assetId: string;

  @ApiProperty()
  @IsUrl()
  @Sanitize()
  url: string;

  @ApiProperty()
  @IsInt()
  bytes: number;

  @ApiProperty()
  @IsString()
  @Sanitize()
  format: string;
}

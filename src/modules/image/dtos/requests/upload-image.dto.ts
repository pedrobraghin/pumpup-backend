import { IsInt, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDTO {
  @ApiProperty()
  @IsString()
  publicId: string;

  @ApiProperty()
  @IsString()
  assetId: string;

  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsInt()
  bytes: number;

  @ApiProperty()
  @IsString()
  format: string;
}

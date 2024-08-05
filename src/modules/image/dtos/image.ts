import { ApiResponseProperty } from '@nestjs/swagger';

export class Image {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  publicId: string;

  @ApiResponseProperty()
  assetId: string;

  @ApiResponseProperty()
  url: string;

  @ApiResponseProperty()
  bytes: number;

  @ApiResponseProperty()
  format: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;
}

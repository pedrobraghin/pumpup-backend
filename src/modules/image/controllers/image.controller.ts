import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ImageService } from '../services/image.service';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { Response } from 'express';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { GetImagesQueryDTO } from '../dtos/requests/get-images-query.dto';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  private readonly logger = new Logger('Images Controller');

  constructor(private readonly imageService: ImageService) {}

  @Post()
  async uploadImage(@Body() data: UploadImageDTO, @Res() response: Response) {
    const image = await this.imageService.uploadImage(data);
    return response.status(HttpStatus.CREATED).json({
      data: image,
      status: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  async getImageById(@Param('id') id: string, @Res() response: Response) {
    const image = await this.imageService.getImageById(id);
    return response.status(HttpStatus.OK).json({
      data: image,
      status: HttpStatus.OK,
    });
  }

  @ApiQuery({
    name: 'format',
    required: false,
    type: String,
  })
  @Get()
  async getAllImages(
    @Res() response: Response,
    @Query() query: GetImagesQueryDTO,
  ) {
    const images = await this.imageService.getAllImages(query);
    return response.status(HttpStatus.OK).json({
      data: images,
      status: HttpStatus.OK,
    });
  }

  @Post('signed_url/:publicId')
  async generateSignedUrl(
    @Param('publicId') publicId: string,
    @Res() response: Response,
  ) {
    const signature = await this.imageService.generateSignedUrl(publicId);
    return response.status(HttpStatus.OK).json({
      data: signature,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateImage(
    @Param('id') id: string,
    @Body() data: UpdateImageDTO,
    @Res() response: Response,
  ) {
    const updatedImage = await this.imageService.updateImage(id, data);
    return response.status(HttpStatus.OK).json({
      data: updatedImage,
      status: 200,
    });
  }

  @Delete()
  async deleteImage(@Param('id') id: string, @Res() response: Response) {
    await this.imageService.deleteImage(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}

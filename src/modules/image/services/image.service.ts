import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageRepository } from '../repositories/image.repository';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { GetImagesQueryDTO } from '../dtos/requests/get-images-query.dto';
import { generateSignedUrlUtil } from '../utils/generateSignedUrl.util';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';

@Injectable()
export class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  async uploadImage(dto: UploadImageDTO) {
    const image = await this.imageRepository.getByIds([
      dto.publicId,
      dto.assetId,
    ]);

    if (image) {
      throw new BadRequestException('Image already exists');
    }

    return await this.imageRepository.upload(dto);
  }

  async getImageById(id: string) {
    const image = await this.imageRepository.getByIds([id]);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async getAllImages(query: GetImagesQueryDTO) {
    const buildedQuery = buildPaginationQuery(query);
    if (!buildedQuery || Object.keys(buildedQuery).length === 0) {
      return this.imageRepository.getAllImages();
    }

    return this.imageRepository.getFilteredImages(buildedQuery);
  }

  async generateSignedUrl(publicId: string) {
    return generateSignedUrlUtil(publicId);
  }

  async updateImage(id: string, dto: UpdateImageDTO) {
    const image = await this.imageRepository.getByIds([id]);
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    if (await this.imageRepository.getByIds([dto.publicId])) {
      throw new BadRequestException('Public id already registered');
    }

    return await this.imageRepository.update(image[0].id, dto);
  }

  async deleteImage(id: string) {
    const image = await this.imageRepository.getByIds([id]);

    if (!image) {
      throw new NotFoundException('Image not found');
    }
    await this.imageRepository.delete(id);
    return;
  }
}

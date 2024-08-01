import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageRepository } from '../repositories/image.repository';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { GetImagesQueryDTO } from '../dtos/requests/get-images-query.dto';
import { paginationItemLimit } from '../../../shared/consts';
import { generateSignedUrlUtil } from '../utils/generateSignedUrl.util';

@Injectable()
export class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  async uploadImage(dto: UploadImageDTO) {
    const checkPublicId = await this.imageRepository.getById(dto.publicId);
    const checkAssetId = await this.imageRepository.getById(dto.assetId);

    if (checkAssetId || checkPublicId) {
      throw new BadRequestException('Image already exists');
    }

    return await this.imageRepository.upload(dto);
  }

  async getImageById(id: string) {
    const image = await this.imageRepository.getById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async getAllImages(query: GetImagesQueryDTO) {
    if (query.page) {
      if (query.page <= 0) {
        query.page = 1;
      }

      if (!query.limit) {
        query.limit = paginationItemLimit;
      }
      query.page = Number(query.page - 1) * query.limit;
    }
    if (!query) {
      return this.imageRepository.getAllImages();
    }
    return this.imageRepository.getFilteredImages(query);
  }

  async generateSignedUrl(publicId: string) {
    return generateSignedUrlUtil(publicId);
  }

  async updateImage(id: string, dto: UpdateImageDTO) {
    const image = await this.imageRepository.getById(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    if (await this.imageRepository.getById(dto.publicId)) {
      throw new BadRequestException('Public id already registered');
    }

    return await this.imageRepository.update(image.id, dto);
  }

  async deleteImage(id: string) {
    const image = await this.imageRepository.getById(id);

    if (!image) {
      throw new NotFoundException('Image not found');
    }
    await this.imageRepository.delete(id);
    return;
  }
}

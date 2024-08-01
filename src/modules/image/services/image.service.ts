import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ImageRepository } from '../repositories/image.repository';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { v2 as cloudinary } from 'cloudinary';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';

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

  async getAllImages(format?: string) {
    if (format) {
      return this.imageRepository.getAllImages(format);
    }

    return this.imageRepository.getAllImages();
  }

  async generateSignedUrl(publicId: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        public_id: publicId,
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`;

    const params = new URLSearchParams({
      signature,
      timestamp: timestamp.toString(),
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
    }).toString();

    return `${uploadUrl}?${params}`;
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';

@Injectable()
export class ImageRepository {
  constructor(private prisma: PrismaService) {}

  async upload(image: UploadImageDTO) {
    return this.prisma.image.create({
      data: image,
    });
  }

  async getById(id: string) {
    return this.prisma.image.findFirst({
      where: {
        OR: [{ id }, { assetId: id }, { publicId: id }],
      },
    });
  }

  async getAllImages(format?: string) {
    return this.prisma.image.findMany({
      where: { format },
    });
  }

  async update(id: string, data: UpdateImageDTO) {
    return this.prisma.image.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.image.delete({ where: { id } });
  }
}

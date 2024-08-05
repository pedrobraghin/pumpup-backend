import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadImageDTO } from '../dtos/requests/upload-image.dto';
import { UpdateImageDTO } from '../dtos/requests/update-image.dto';
import { GetImagesQueryDTO } from '../dtos/requests/get-images-query.dto';
import { defaultPage, paginationItemLimit } from '../../../shared/consts';

@Injectable()
export class ImageRepository {
  constructor(private prisma: PrismaService) {}

  async upload(image: UploadImageDTO) {
    return this.prisma.image.create({
      data: image,
    });
  }

  async getByIds(ids: string[]) {
    return this.prisma.image.findFirst({
      where: {
        OR: [
          { id: { in: ids } },
          { assetId: { in: ids } },
          { publicId: { in: ids } },
        ],
      },
    });
  }

  async getAllImages() {
    return this.prisma.image.findMany({
      orderBy: { bytes: 'asc' },
      skip: defaultPage,
      take: paginationItemLimit,
    });
  }

  async getFilteredImages(query: GetImagesQueryDTO) {
    return this.prisma.image.findMany({
      where: { format: query.format },
      skip: query.page,
      take: query.limit,
      orderBy: { bytes: 'asc' },
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

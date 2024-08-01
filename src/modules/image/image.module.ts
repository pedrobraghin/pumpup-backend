import { Module } from '@nestjs/common';
import { ImageController } from './controllers/image.controller';
import { ImageRepository } from './repositories/image.repository';
import { ImageService } from './services/image.service';

@Module({
  imports: [],
  providers: [ImageRepository, ImageService],
  controllers: [ImageController],
})
export class ImageModule {}

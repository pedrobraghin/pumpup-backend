import { Module } from '@nestjs/common';
import { TrainController } from './controller/train.controller';
import { TrainService } from './service/train.service';
import { TrainRepository } from './repository/train.repository';

@Module({
  providers: [TrainService, TrainRepository],
  controllers: [TrainController],
  imports: [],
  exports: [TrainService],
})
export class TrainModule {}

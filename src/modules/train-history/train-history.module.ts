import { Module } from '@nestjs/common';
import { TrainHistoryController } from './controller/train-history.controller';
import { TrainHistoryRepository } from './repository/train-history.repository';
import { TrainHistoryService } from './service/train-history.service';
import { TrainModule } from '../train/train.module';

@Module({
  providers: [TrainHistoryRepository, TrainHistoryService],
  controllers: [TrainHistoryController],
  imports: [TrainModule],
  exports: [TrainHistoryService],
})
export class TrainHistoryModule {}

import { Module } from '@nestjs/common';
import { TrainController } from './controller/train.controller';
import { TrainService } from './service/train.service';
import { TrainRepository } from './repository/train.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [TrainService, TrainRepository],
  controllers: [TrainController],
  imports: [UserModule],
})
export class TrainModule {}

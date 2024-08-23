import { Module } from '@nestjs/common';
import { CardioSerieRepository } from './repository/cardio-serie.repository';
import { CardioSerieService } from './service/cardio-serie.service';
import { CardioSerieController } from './controller/cardio-serie.controller';

@Module({
  exports: [],
  imports: [],
  providers: [CardioSerieRepository, CardioSerieService],
  controllers: [CardioSerieController],
})
export class CardioSerieModule {}

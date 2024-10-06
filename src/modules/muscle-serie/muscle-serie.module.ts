import { Module } from '@nestjs/common';
import { MuscleSerieRepository } from './repository/muscle-serie.repository';
import { MuscleSerieService } from './service/muscle-serie.service';
import { MuscleSerieController } from './controller/muscle-serie.controller';

@Module({
  controllers: [MuscleSerieController],
  providers: [MuscleSerieRepository, MuscleSerieService],
  imports: [],
  exports: [MuscleSerieService],
})
export class MuscleSerieModule {}

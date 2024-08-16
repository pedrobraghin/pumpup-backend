import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { ImageModule } from './modules/image/image.module';
import { UserModule } from './modules/user/user.module';
import { TrainModule } from './modules/train/train.module';
import { MuscleSerieModule } from './modules/muscle-serie/muscle-serie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    PrismaModule,
    UserModule,
    ExerciseModule,
    ImageModule,
    TrainModule,
    MuscleSerieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

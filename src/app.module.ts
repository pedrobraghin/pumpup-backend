import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    PrismaModule,
    ExerciseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

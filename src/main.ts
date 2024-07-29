import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pumpup API')
    .setDescription('The API of Pumpup APP')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.debug(
      `Servidor rodando em http://localhost:${port}`,
      'Application server',
    );

    Logger.debug(
      `Documentação rodando em http://localhost:${port}/api`,
      'Swagger',
    );
  });
}

bootstrap();

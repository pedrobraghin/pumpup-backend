import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as process from 'node:process';

const port = process.env.APP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.APP_ROUTE_PREFIX);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: [process.env.FRONTEND_REQUEST_URL, process.env.MOBILE_REQUEST_URL],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['POST', 'GET', 'DELETE', 'PATCH'],
  });
  app.use(cookieParser());
  app.use(csurf({ cookie: true, value: (req) => req.csrfToken() }));
  app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pumpup API')
    .setDescription('The API of Pumpup APP')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(process.env.SWAGGER_ROUTE_PREFIX, app, document);

  await app.listen(port, () => {
    Logger.debug(
      `Servidor rodando em http://localhost:${port}`,
      'ApplicationServer',
    );

    Logger.debug(
      `Documentação rodando em http://localhost:${port}/api/v1/docs`,
      'Swagger',
    );
  });
}

bootstrap();

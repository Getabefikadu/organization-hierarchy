import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EntityNotFoundExceptionFilter } from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const builder = new DocumentBuilder()
  // .setTitle('Perago Information systems')
  // .setDescription('Organizational Hierarchy')
  // .setVersion('1.0')
  // .addTag('PIS')
  // .build();

  // const document = SwaggerModule.createDocument(app, builder);
  // SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = app.get(ConfigService)
  const port = config.get('APP_PORT') || 3333
  
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
///

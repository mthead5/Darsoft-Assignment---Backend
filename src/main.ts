import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SeedsService } from './seeds/seeds.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('News App')
    .setDescription('A simple news web api')
    .setVersion('1.0')
    .addTag('news')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  // Here we are using the config service so we can access
  // the env file within other services.
  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe());

  // Here we are seeding the intial data into MongoDB
  app.get(SeedsService).seed();

  await app.listen(port);
}
bootstrap();

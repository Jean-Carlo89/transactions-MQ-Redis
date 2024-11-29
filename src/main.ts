import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createCustomExceptionFactory } from './validation/custom-excpetion';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //****** removes unwanted properties ***** */

      transform: true,
      exceptionFactory: createCustomExceptionFactory,
    }),
  );

  await app.listen(3000);
}
bootstrap();

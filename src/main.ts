import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // loại bỏ field thừa
      forbidNonWhitelisted: true,  // báo lỗi field thừa
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: (errors) => {
        return {
          statusCode: 400,
          message: errors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints || {}), // FIX HERE
          })),
        };
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

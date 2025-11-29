import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Interceptor để format response
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global Validation Pipe
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
            errors: Object.values(err.constraints || {}),
          })),
        };
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

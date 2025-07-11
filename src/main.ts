import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: 400,
    // mostra erros no console
    exceptionFactory: (errors) => {
      console.error('Erro de validação:', errors);
      return new BadRequestException(errors);
    },
  }));
  await app.listen(3001);
}
bootstrap();

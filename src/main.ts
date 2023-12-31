import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Essa configuração indica que as chaves do JSON devem ser iguais ao do objeto no qual o JSON será transformado, ignorando chaves que não são pareáveis a atributos do objeto.
      forbidNonWhitelisted: true, // Através dessa configuração, indicamos que qualquer chave que vier que não tiver par no objeto final deverá causar um erro, o que sinaliza que o cliente da nossa API está tentando enviar dados que não aceitamos.
    }),
  );
  await app.listen(3000);
}
bootstrap();

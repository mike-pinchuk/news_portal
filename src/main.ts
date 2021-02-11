import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { expressMiddleware } from 'cls-rtracer';
import { AppModule } from './app.module';
import { typedEnv } from './utils/typed-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expressMiddleware())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  const options = new DocumentBuilder()
      .setTitle('News Portal')
      .setDescription('News portals with ability to do posts')
      .addBearerAuth()
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document)

  await app.listen(typedEnv.PORT);
}
bootstrap();

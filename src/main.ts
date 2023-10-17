import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Backend Freela Documentation')
    .setDescription("Hey everyone, this is the documentation for the backend of the Freela project. It includes all the endpoints and the models that are used in the project. To serve as a guide, the proper direction to user the endpoints are: users, auth/login and persons, this will create and auth your user for use, the default role will be 'USER', however, to be able to check all endpoints, use the role as 'ADMIN'. Right after that, you can create services requests and bids for them.")
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth/login')
    .addTag('persons')
    .addTag('service')
    .addTag('bid')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

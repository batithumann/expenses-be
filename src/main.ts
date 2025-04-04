import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    // origin: 'http://localhost:4200', // Allow requests from this origin
    origin: '*',
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH', // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  });

  const config = new DocumentBuilder()
    .setTitle('Expenses')
    .setDescription('description')
    .setVersion('1.0')
    // .addTag('tag')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();

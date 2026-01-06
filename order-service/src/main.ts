import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Order Service API')
    .setDescription('Order creation and management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`🛒 Order Service running on http://localhost:${port}`);
  console.log(`📚 Swagger docs on http://localhost:${port}/api`);
}
bootstrap();

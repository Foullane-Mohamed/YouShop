import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('YouShop API Gateway')
    .setDescription('Single entry point for all microservices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`\n🚀 API Gateway running on http://localhost:${port}`);
  console.log(`📚 Swagger docs on http://localhost:${port}/api\n`);
  console.log(`📡 Routing to:`);
  console.log(`   Auth Service: ${process.env.AUTH_SERVICE_URL}`);
  console.log(`   Catalog Service: ${process.env.CATALOG_SERVICE_URL}`);
  console.log(`   Order Service: ${process.env.ORDER_SERVICE_URL}`);
  console.log(`   Inventory Service: ${process.env.INVENTORY_SERVICE_URL}\n`);
}
bootstrap();

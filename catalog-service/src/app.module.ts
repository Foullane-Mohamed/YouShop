import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { HealthController } from './health.controller';
import { ProductService } from './product.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [HealthController, ProductController],
  providers: [ProductService, PrismaService],
})
export class AppModule {}

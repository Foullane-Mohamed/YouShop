import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { HealthController } from './health.controller';
import { StockService } from './stock.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [HealthController, StockController],
  providers: [StockService, PrismaService],
})
export class AppModule {}

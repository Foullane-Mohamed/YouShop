import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class AppModule {}

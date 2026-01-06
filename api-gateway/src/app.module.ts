import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthGatewayController } from './auth-gateway.controller';
import { CatalogGatewayController } from './catalog-gateway.controller';
import { OrderGatewayController } from './order-gateway.controller';
import { InventoryGatewayController } from './inventory-gateway.controller';
import { HealthController } from './health.controller';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ,
    }),
  ],
  controllers: [
    HealthController,
    AuthGatewayController,
    CatalogGatewayController,
    OrderGatewayController,
    InventoryGatewayController,
  ],
  providers: [GatewayService, AuthGuard],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthGatewayController } from './auth-gateway.controller';
import { CatalogGatewayController } from './catalog-gateway.controller';
import { OrderGatewayController } from './order-gateway.controller';
import { InventoryGatewayController } from './inventory-gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('JWT_SECRET environment variable must be set in production');
        }
        return 'dev-secret-change-in-production-f8a7b3e2d9c4';
      })(),
    }),
  ],
  controllers: [
    AuthGatewayController,
    CatalogGatewayController,
    OrderGatewayController,
    InventoryGatewayController,
  ],
  providers: [GatewayService, AuthGuard],
})
export class AppModule {}

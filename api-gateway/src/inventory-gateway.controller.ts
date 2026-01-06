import { Controller, Get, Post, Body, Param, Query, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';
import { BaseGatewayController, RequestHeaders } from './common/base-gateway.controller';
import { servicesConfig } from './config/services.config';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryGatewayController extends BaseGatewayController {
  constructor(gateway: GatewayService) {
    super(gateway, servicesConfig.inventoryServiceUrl);
  }

  @Get('stock')
  @ApiOperation({ summary: 'Get all stock records' })
  async getAllStock() {
    return this.proxyGet('/stock');
  }

  @Get('stock/:productId')
  @ApiOperation({ summary: 'Get stock for specific product' })
  async getStock(@Param('productId') productId: string) {
    return this.proxyGet(`/stock/${productId}`);
  }

  @Post('stock')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add stock (requires auth)' })
  async addStock(@Body() body: any, @Headers() headers: RequestHeaders) {
    return this.proxyPost('/stock', body, headers);
  }
}

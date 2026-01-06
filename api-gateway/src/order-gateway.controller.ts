import { Controller, Get, Post, Patch, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';
import { BaseGatewayController, RequestHeaders } from './common/base-gateway.controller';
import { servicesConfig } from './config/services.config';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class OrderGatewayController extends BaseGatewayController {
  constructor(gateway: GatewayService) {
    super(gateway, servicesConfig.orderServiceUrl);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@Body() body: any, @Headers() headers: RequestHeaders) {
    return this.proxyPost('/orders', body, headers);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user orders' })
  async getOrders(@Headers() headers: RequestHeaders) {
    return this.proxyGet('/orders', headers);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') id: string, @Headers() headers: RequestHeaders) {
    return this.proxyGet(`/orders/${id}`, headers);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  async cancelOrder(@Param('id') id: string, @Headers() headers: RequestHeaders) {
    return this.proxyPatch(`/orders/${id}/cancel`, {}, headers);
  }
}

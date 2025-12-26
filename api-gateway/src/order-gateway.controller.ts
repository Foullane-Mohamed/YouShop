import { Controller, Get, Post, Patch, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class OrderGatewayController {
  private orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

  constructor(private gateway: GatewayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@Body() body: any, @Headers() headers: any) {
    return this.gateway.post(`${this.orderServiceUrl}/orders`, body, headers);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user orders' })
  async getOrders(@Headers() headers: any) {
    return this.gateway.get(`${this.orderServiceUrl}/orders`, headers);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') id: string, @Headers() headers: any) {
    return this.gateway.get(`${this.orderServiceUrl}/orders/${id}`, headers);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order' })
  async cancelOrder(@Param('id') id: string, @Headers() headers: any) {
    return this.gateway.patch(`${this.orderServiceUrl}/orders/${id}/cancel`, {}, headers);
  }
}

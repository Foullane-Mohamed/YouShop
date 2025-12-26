import { Controller, Get, Post, Patch, Body, Param, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', description: 'User ID from JWT (set by API Gateway)' })
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  create(@Headers('x-user-id') userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.create(userId, dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', description: 'User ID from JWT (set by API Gateway)' })
  @ApiOperation({ summary: 'Get all orders for current user' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  findAll(@Headers('x-user-id') userId: string) {
    return this.orderService.findByUser(userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', description: 'User ID from JWT (set by API Gateway)' })
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order details' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string, @Headers('x-user-id') userId: string) {
    return this.orderService.findOne(id, userId);
  }

  @Patch(':id/cancel')
  @ApiBearerAuth()
  @ApiHeader({ name: 'x-user-id', description: 'User ID from JWT (set by API Gateway)' })
  @ApiOperation({ summary: 'Cancel an order' })
  @ApiResponse({ status: 200, description: 'Order cancelled' })
  @ApiResponse({ status: 400, description: 'Cannot cancel order' })
  cancel(@Param('id') id: string, @Headers('x-user-id') userId: string) {
    return this.orderService.cancel(id, userId);
  }
}

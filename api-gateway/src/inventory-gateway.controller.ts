import { Controller, Get, Post, Body, Param, Query, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryGatewayController {
  private inventoryServiceUrl = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004';

  constructor(private gateway: GatewayService) {}

  @Get('stock')
  @ApiOperation({ summary: 'Get all stock records' })
  async getAllStock() {
    return this.gateway.get(`${this.inventoryServiceUrl}/stock`);
  }

  @Get('stock/:productId')
  @ApiOperation({ summary: 'Get stock for specific product' })
  async getStock(@Param('productId') productId: string) {
    return this.gateway.get(`${this.inventoryServiceUrl}/stock/${productId}`);
  }

  @Post('stock')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add stock (requires auth)' })
  async addStock(@Body() body: any, @Headers() headers: any) {
    return this.gateway.post(`${this.inventoryServiceUrl}/stock`, body, headers);
  }
}

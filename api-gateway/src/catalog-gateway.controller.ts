import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogGatewayController {
  private catalogServiceUrl = process.env.CATALOG_SERVICE_URL || 'http://localhost:3002';

  constructor(private gateway: GatewayService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get all products (public)' })
  async getProducts() {
    return this.gateway.get(`${this.catalogServiceUrl}/products`);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProduct(@Param('id') id: string) {
    return this.gateway.get(`${this.catalogServiceUrl}/products/${id}`);
  }

  @Post('products')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (requires auth)' })
  async createProduct(@Body() body: any, @Headers() headers: any) {
    return this.gateway.post(`${this.catalogServiceUrl}/products`, body, headers);
  }

  @Put('products/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  async updateProduct(@Param('id') id: string, @Body() body: any, @Headers() headers: any) {
    return this.gateway.put(`${this.catalogServiceUrl}/products/${id}`, body, headers);
  }

  @Delete('products/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  async deleteProduct(@Param('id') id: string, @Headers() headers: any) {
    return this.gateway.delete(`${this.catalogServiceUrl}/products/${id}`, headers);
  }
}

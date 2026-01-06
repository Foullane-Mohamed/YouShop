import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';
import { BaseGatewayController, RequestHeaders } from './common/base-gateway.controller';
import { servicesConfig } from './config/services.config';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogGatewayController extends BaseGatewayController {
  constructor(gateway: GatewayService) {
    super(gateway, servicesConfig.catalogServiceUrl);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get all products (public)' })
  async getProducts() {
    return this.proxyGet('/products');
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  async getProduct(@Param('id') id: string) {
    return this.proxyGet(`/products/${id}`);
  }

  @Post('products')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create product (requires auth)' })
  async createProduct(@Body() body: any, @Headers() headers: RequestHeaders) {
    return this.proxyPost('/products', body, headers);
  }

  @Put('products/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product' })
  async updateProduct(@Param('id') id: string, @Body() body: any, @Headers() headers: RequestHeaders) {
    return this.proxyPut(`/products/${id}`, body, headers);
  }

  @Delete('products/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  async deleteProduct(@Param('id') id: string, @Headers() headers: RequestHeaders) {
    return this.proxyDelete(`/products/${id}`, headers);
  }
}

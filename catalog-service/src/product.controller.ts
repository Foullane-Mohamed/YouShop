import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product (requires auth)' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 409, description: 'SKU already exists' })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products (public)' })
  @ApiResponse({ status: 200, description: 'List of products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('sku/:sku')
  @ApiOperation({ summary: 'Get product by SKU (internal use)' })
  @ApiResponse({ status: 200, description: 'Product details' })
  findBySku(@Param('sku') sku: string) {
    return this.productService.findBySku(sku);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product (requires auth)' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product (requires auth)' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}

import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { AddStockDto, DecreaseStockDto, IncreaseStockDto } from './stock.dto';

@ApiTags('Inventory')
@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add or update stock for a product' })
  @ApiResponse({ status: 201, description: 'Stock added/updated' })
  addStock(@Body() dto: AddStockDto) {
    return this.stockService.addStock(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock records' })
  @ApiResponse({ status: 200, description: 'List of all stock' })
  getAllStock() {
    return this.stockService.getAllStock();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get stock for specific product' })
  @ApiResponse({ status: 200, description: 'Stock details' })
  @ApiResponse({ status: 404, description: 'Stock not found' })
  getStock(@Param('productId') productId: string) {
    return this.stockService.getStock(productId);
  }

  @Post('decrease')
  @ApiOperation({ summary: 'Decrease stock (internal - called by Order Service)' })
  @ApiResponse({ status: 200, description: 'Stock decreased' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  decreaseStock(@Body() dto: DecreaseStockDto) {
    return this.stockService.decreaseStock(dto);
  }

  @Post('increase')
  @ApiOperation({ summary: 'Increase stock (internal - called when order cancelled)' })
  @ApiResponse({ status: 200, description: 'Stock increased' })
  increaseStock(@Body() dto: IncreaseStockDto) {
    return this.stockService.increaseStock(dto);
  }

  @Get('check/:productId')
  @ApiOperation({ summary: 'Check stock availability (internal)' })
  @ApiResponse({ status: 200, description: 'Availability status' })
  checkAvailability(
    @Param('productId') productId: string,
    @Query('quantity') quantity: string,
  ) {
    return this.stockService.checkAvailability(productId, parseInt(quantity));
  }
}

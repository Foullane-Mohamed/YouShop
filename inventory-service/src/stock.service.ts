import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AddStockDto, DecreaseStockDto, IncreaseStockDto } from './stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  /**
   * Add or update stock for a product
   */
  async addStock(dto: AddStockDto) {
    const existing = await this.prisma.stock.findUnique({
      where: { productId: dto.productId },
    });

    if (existing) {
      // Update existing stock
      return this.prisma.stock.update({
        where: { productId: dto.productId },
        data: { quantity: existing.quantity + dto.quantity },
      });
    } else {
      // Create new stock entry
      return this.prisma.stock.create({
        data: {
          productId: dto.productId,
          quantity: dto.quantity,
        },
      });
    }
  }

  /**
   * Get stock for a specific product
   */
  async getStock(productId: string) {
    const stock = await this.prisma.stock.findUnique({
      where: { productId },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found for this product');
    }

    return {
      ...stock,
      available: stock.quantity - stock.reserved,
    };
  }

  /**
   * Get all stock records
   */
  async getAllStock() {
    const stocks = await this.prisma.stock.findMany();
    return stocks.map(stock => ({
      ...stock,
      available: stock.quantity - stock.reserved,
    }));
  }

  /**
   * Decrease stock (called when order is created)
   * This is called by Order Service via HTTP
   */
  async decreaseStock(dto: DecreaseStockDto) {
    const stock = await this.prisma.stock.findUnique({
      where: { productId: dto.productId },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found for this product');
    }

    const available = stock.quantity - stock.reserved;
    if (available < dto.quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${available}, Requested: ${dto.quantity}`,
      );
    }

    // Decrease quantity
    return this.prisma.stock.update({
      where: { productId: dto.productId },
      data: { quantity: stock.quantity - dto.quantity },
    });
  }

  /**
   * Increase stock (called when order is cancelled)
   * This returns stock back to inventory
   */
  async increaseStock(dto: IncreaseStockDto) {
    const stock = await this.prisma.stock.findUnique({
      where: { productId: dto.productId },
    });

    if (!stock) {
      throw new NotFoundException('Stock not found for this product');
    }

    return this.prisma.stock.update({
      where: { productId: dto.productId },
      data: { quantity: stock.quantity + dto.quantity },
    });
  }

  /**
   * Check if stock is available (used by Order Service)
   */
  async checkAvailability(productId: string, quantity: number) {
    const stock = await this.prisma.stock.findUnique({
      where: { productId },
    });

    if (!stock) {
      return { available: false, message: 'Product not in stock' };
    }

    const available = stock.quantity - stock.reserved;
    if (available < quantity) {
      return {
        available: false,
        message: `Insufficient stock. Available: ${available}, Requested: ${quantity}`,
      };
    }

    return { available: true, currentStock: available };
  }
}

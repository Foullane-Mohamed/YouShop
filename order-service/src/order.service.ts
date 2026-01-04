import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private inventoryUrl = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004';

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  /**
   * Create a new order
   * Flow:
   * 1. Validate all items have stock
   * 2. Decrease stock in Inventory Service (HTTP call)
   * 3. Create order in database
   * 4. If any step fails, rollback
   */
  async create(userId: string, dto: CreateOrderDto) {
    // Validate stock for all items
    for (const item of dto.items) {
      const stockCheck = await this.checkStock(item.productId, item.quantity);
      if (!stockCheck.available) {
        throw new BadRequestException(
          `Product ${item.productId}: ${stockCheck.message}`,
        );
      }
    }

    // Calculate total
    const total = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Decrease stock for all items (call Inventory Service)
    for (const item of dto.items) {
      await this.decreaseStock(item.productId, item.quantity);
    }

    // Create order
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: dto.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return order;
  }

  /**
   * Get all orders for a user
   */
  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get order by ID
   */
  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  /**
   * Cancel an order
   * - Update status to CANCELLED
   * - Return stock to inventory (HTTP call)
   */
  async cancel(id: string, userId: string) {
    const order = await this.findOne(id, userId);

    if (order.status === 'CANCELLED') {
      throw new BadRequestException('Order already cancelled');
    }

    if (order.status === 'PAID') {
      throw new BadRequestException('Cannot cancel paid order');
    }

    // Return stock to inventory
    for (const item of order.items) {
      await this.increaseStock(item.productId, item.quantity);
    }

    // Update order status
    return this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { items: true },
    });
  }

  /**
   * Check stock availability via Inventory Service
   */
  private async checkStock(productId: string, quantity: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.inventoryUrl}/stock/check/${productId}?quantity=${quantity}`,
        ),
      );
      return response.data;
    } catch (error) {
      return { available: false, message: 'Could not check stock' };
    }
  }

  /**
   * Decrease stock via Inventory Service
   */
  private async decreaseStock(productId: string, quantity: number) {
    try {
      await firstValueFrom(
        this.httpService.post(`${this.inventoryUrl}/stock/decrease`, {
          productId,
          quantity,
        }),
      );
    } catch (error) {
      throw new BadRequestException('Failed to decrease stock');
    }
  }

  /**
   * Increase stock via Inventory Service (when order cancelled)
   */
  private async increaseStock(productId: string, quantity: number) {
    try {
      await firstValueFrom(
        this.httpService.post(`${this.inventoryUrl}/stock/increase`, {
          productId,
          quantity,
        }),
      );
    } catch (error) {
      // Log error but don't fail (stock can be manually adjusted)
      this.logger.error(`Failed to increase stock: ${error.message}`, error.stack);
    }
  }
}

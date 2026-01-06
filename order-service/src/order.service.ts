import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  private inventoryUrl = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004';

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {
    for (const item of dto.items) {
      const stockCheck = await this.checkStock(item.productId, item.quantity);
      if (!stockCheck.available) {
        throw new BadRequestException(
          `Product ${item.productId}: ${stockCheck.message}`,
        );      }
    }

    const total = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    for (const item of dto.items) {      await this.decreaseStock(item.productId, item.quantity);
    }

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
    });    return order;
  }

  async findByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },    });
  }

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, userId },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }    return order;
  }

  async cancel(id: string, userId: string) {
    const order = await this.findOne(id, userId);

    if (order.status === 'CANCELLED') {
      throw new BadRequestException('Order already cancelled');
    }

    if (order.status === 'PAID') {      throw new BadRequestException('Cannot cancel paid order');
    }

    for (const item of order.items) {      await this.increaseStock(item.productId, item.quantity);
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { items: true },    });
  }

  private async checkStock(productId: string, quantity: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.inventoryUrl}/stock/check/${productId}?quantity=${quantity}`,
        ),
      );
      return response.data;
    } catch (error) {
      return { available: false, message: 'Could not check stock' };    }
  }

  private async decreaseStock(productId: string, quantity: number) {
    try {
      await firstValueFrom(
        this.httpService.post(`${this.inventoryUrl}/stock/decrease`, {
          productId,
          quantity,
        }),
      );
    } catch (error) {
      throw new BadRequestException('Failed to decrease stock');    }
  }

  private async increaseStock(productId: string, quantity: number) {
    try {
      await firstValueFrom(
        this.httpService.post(`${this.inventoryUrl}/stock/increase`, {
          productId,
          quantity,
        }),      );
    } catch (error) {
      console.error('Failed to increase stock:', error.message);
    }
  }
}

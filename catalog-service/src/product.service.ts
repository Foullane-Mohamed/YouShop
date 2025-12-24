import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new product
   */
  async create(dto: CreateProductDto) {
    // Check if SKU already exists
    const existing = await this.prisma.product.findUnique({
      where: { sku: dto.sku },
    });

    if (existing) {
      throw new ConflictException('Product with this SKU already exists');
    }

    return this.prisma.product.create({ data: dto });
  }

  /**
   * Get all products (public endpoint)
   */
  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get product by ID
   */
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Get product by SKU (used by other services)
   */
  async findBySku(sku: string) {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  /**
   * Update product
   */
  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id); // Check exists

    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Delete product
   */
  async remove(id: string) {
    await this.findOne(id); // Check exists

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }
}

import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Gaming Laptop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'High-performance gaming laptop with RTX 4090' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'LAP-001', description: 'Stock Keeping Unit (unique identifier)' })
  @IsString()
  @IsNotEmpty()
  sku: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Gaming Laptop Pro' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1499.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}

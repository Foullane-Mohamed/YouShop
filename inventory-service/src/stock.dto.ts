import { IsString, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddStockDto {
  @ApiProperty({ example: 'LAP-001' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class DecreaseStockDto {
  @ApiProperty({ example: 'LAP-001' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class IncreaseStockDto {
  @ApiProperty({ example: 'LAP-001' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;
}

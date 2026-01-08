import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone' })
  name: string;

  @ApiProperty({ example: 'Smartphones' })
  category: string;

  @ApiProperty({ example: 10, minimum: 0 })
  quantityInStock: number;

  @ApiProperty({ example: 999.99, minimum: 0 })
  price: number;
}

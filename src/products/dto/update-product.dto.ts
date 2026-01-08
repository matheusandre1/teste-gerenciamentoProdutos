import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiPropertyOptional({ example: 'iPhone 15 Pro' })
    name?: string;

    @ApiPropertyOptional({ example: 'Smartphones' })
    category?: string;

    @ApiPropertyOptional({ example: 5 })
    quantityInStock?: number;

    @ApiPropertyOptional({ example: 1199.99 })
    price?: number;
}           
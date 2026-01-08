import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./schemas/product.schema";
import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all products' })
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'price', 'quantityInStock'] })
    @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
    async findAll(
        @Query('category') category?: string,
        @Query('sortBy') sortBy: string = 'name',
        @Query('order') order: 'asc' | 'desc' = 'asc',
    ): Promise<Product[]> {
        return this.productsService.findAll(category, sortBy, order);
    }

    @Get(':idOrName')
    @ApiOperation({ summary: 'Find a product by ID or name' })
    async findOne(@Param('idOrName') idOrName: string): Promise<Product | Product[]> {
        return this.productsService.findOne(idOrName);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    async remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id);
    }
}
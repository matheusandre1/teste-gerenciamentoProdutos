import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./schemas/product.schema";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productsRepository.create(createProductDto);
    }

    async findAll(category?: string, sortBy: string = 'name', order: 'asc' | 'desc' = 'asc'): Promise<Product[]> {
        return this.productsRepository.findAll({ category }, { [sortBy]: order });
    }

    async findOne(idOrName: string): Promise<Product | Product[]> {

        if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
            const product = await this.productsRepository.findById(idOrName);
            if (product) return product;
        }

        const products = await this.productsRepository.findByName(idOrName);
        if (products.length === 0) {
            throw new NotFoundException(`Product with ID or name "${idOrName}" not found`);
        }
        return products.length === 1 ? products[0] : products;
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.productsRepository.update(id, updateProductDto);
        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }

    async remove(id: string): Promise<Product> {
        const product = await this.productsRepository.delete(id);
        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }
}
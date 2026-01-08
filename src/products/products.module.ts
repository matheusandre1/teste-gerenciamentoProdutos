import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsRepository } from './products.repository';
import { ProductController } from './product.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsRepository, ProductsService],
  exports: [ProductsRepository],
  controllers: [ProductController],
})
export class ProductsModule {}

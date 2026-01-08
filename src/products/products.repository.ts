import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: Partial<Product>): Promise<ProductDocument> {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async findAll(
    filter: { category?: string } = {},
    sort: { [key: string]: 'asc' | 'desc' } = {},
  ): Promise<ProductDocument[]> {
    const findQuery: any = {};

    if (filter.category) {
      findQuery.category = filter.category;
    }

    return this.productModel.find(findQuery).sort(sort).exec();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.productModel.findById(id).exec();
  }

  async findByName(name: string): Promise<ProductDocument[]> {
    return this.productModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async update(
    id: string,
    updateProductDto: Partial<Product>,
  ): Promise<ProductDocument | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}

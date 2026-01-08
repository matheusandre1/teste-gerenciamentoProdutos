import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            (ret as any).id = ret._id?.toString();
            delete (ret as any)._id;
            delete (ret as any).__v;
            return ret;
        },
    },
})
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, min: 0 })
    quantityInStock: number;

    @Prop({ required: true, min: 0 })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

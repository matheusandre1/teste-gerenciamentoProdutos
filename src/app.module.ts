import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:password@127.0.0.1:27017/agilstore?authSource=admin'),
    ProductsModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

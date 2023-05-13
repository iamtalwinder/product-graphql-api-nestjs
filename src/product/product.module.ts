import { Module } from '@nestjs/common';
import { ProductService } from './services';
import { ProductResolver } from './resolvers';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  exports: [ProductService],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './services';
import { ProductResolver } from './resolvers';

@Module({
  exports: [ProductService],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}

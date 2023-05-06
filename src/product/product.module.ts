import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';

@Module({
  exports: [ProductService],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}

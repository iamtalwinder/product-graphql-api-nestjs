import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return this.productService.findAll();
  }
}

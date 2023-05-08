import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return this.productService.findAll();
  }
}

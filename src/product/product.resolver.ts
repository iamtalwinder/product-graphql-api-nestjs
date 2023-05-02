import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products() {
    return this.productService.findAll();
  }
}

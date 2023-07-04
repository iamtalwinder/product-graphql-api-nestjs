import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities';
import { CreateProductInput, GetProductsOutput, ProductFilterInput, UpdateProductInput } from '../dtos';
import { UserRole } from 'src/user';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductResolver {
  constructor(private productService: ProductService) {}


  @Query(() => GetProductsOutput)
  async getProducts(
    @Args('filter', { type: () => ProductFilterInput, nullable: true }) filter: ProductFilterInput,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20 }) limit?: number,
  ): Promise<GetProductsOutput> {
    return this.productService.findAllWithFilterAndCount(filter, page, limit);
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @Mutation(() => Product)
  @Roles(UserRole.admin, UserRole.manager)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Mutation(() => Product)
  @Roles(UserRole.admin, UserRole.manager)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.findOneAndUpdate(id, updateProductInput);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.admin, UserRole.manager)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    await this.productService.deleteById(id);
    return true
  }
}

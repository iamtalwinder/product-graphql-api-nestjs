import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { UserRole } from 'src/user';
import { ProductService } from '../services/product.service';
import { Product } from '../entities';
import { CreateProductInput, GetProductsOutput, ProductFilterInput, UpdateProductInput } from '../dtos';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  /**
   * Retrieves a list of products, with optional filtering, pagination, and limit.
   */
  @Query(() => GetProductsOutput, { description: 'Retrieve a list of products with optional filters.' })
  async getProducts(
    @Args('filter', { type: () => ProductFilterInput, nullable: true, description: 'Filter options for products.' })
    filter: ProductFilterInput,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1, description: 'Page number for pagination.' })
    page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20, description: 'Number of products per page.' })
    limit?: number,
  ): Promise<GetProductsOutput> {
    return this.productService.findAllWithFilterAndCount(filter, page, limit);
  }

  /**
   * Retrieves a single product by its ID.
   */
  @Query(() => Product, { description: 'Retrieve a single product by its unique identifier.' })
  async getProductById(
    @Args('id', { description: 'The unique identifier of the product.' }) id: string,
  ): Promise<Product> {
    return this.productService.findOneById(id);
  }

  /**
   * Creates a new product with the given details.
   */
  @Mutation(() => Product, { description: 'Create a new product.' })
  @Roles(UserRole.admin, UserRole.manager)
  async createProduct(
    @Args('createProductInput', { description: 'The data used to create a new product.' })
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  /**
   * Updates an existing product identified by its ID with new details.
   */
  @Mutation(() => Product, { description: 'Update an existing product.' })
  @Roles(UserRole.admin, UserRole.manager)
  async updateProduct(
    @Args('id', { description: 'The unique identifier of the product to be updated.' }) id: string,
    @Args('updateProductInput', { description: 'The new details to update the product with.' })
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.findOneAndUpdate(id, updateProductInput);
  }

  /**
   * Deletes a product identified by its ID.
   */
  @Mutation(() => Boolean, { description: 'Delete a product.' })
  @Roles(UserRole.admin, UserRole.manager)
  async deleteProduct(
    @Args('id', { description: 'The unique identifier of the product to be deleted.' }) id: string,
  ): Promise<boolean> {
    await this.productService.deleteById(id);
    return true;
  }
}

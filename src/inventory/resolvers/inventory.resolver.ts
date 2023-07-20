import { Resolver, Query, Args, Mutation, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { UserRole } from 'src/user';
import { Product, ProductService } from 'src/product';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../entities';
import { CreateInventoryInput, GetInventoryOutput, InventoryFilterInput, UpdateInventoryInput } from '../dtos';

@Resolver(() => Inventory)
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryResolver {
  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
  ) {}

  @Query(() => GetInventoryOutput, { description: 'Retrieve a list of inventory items with optional filters.' })
  @Roles(UserRole.admin, UserRole.manager)
  async getInventory(
    @Args('filter', {
      type: () => InventoryFilterInput,
      nullable: true,
      description: 'Filter options for inventory items.',
    })
    filter: InventoryFilterInput,
    @Args('page', { type: () => Int, nullable: true, description: 'Page number for pagination.' }) page?: number,
    @Args('limit', { type: () => Int, nullable: true, description: 'Number of inventory items per page.' })
    limit?: number,
  ): Promise<GetInventoryOutput> {
    return this.inventoryService.findAllWithFilterAndCount(filter, page, limit);
  }

  @Query(() => Inventory, { description: 'Retrieve a single inventory item by its ID.' })
  @Roles(UserRole.admin, UserRole.manager)
  async getInventoryById(
    @Args('id', { description: 'The unique identifier of the inventory item.' }) id: string,
  ): Promise<Inventory> {
    return this.inventoryService.findOneById(id);
  }

  @Mutation(() => Inventory, { description: 'Create a new inventory item with the specified details.' })
  @Roles(UserRole.admin, UserRole.manager)
  async createInventory(
    @Args('createInventoryInput', { description: 'Input data for creating a new inventory item.' })
    createInventoryInput: CreateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.create(createInventoryInput);
  }

  @Mutation(() => Inventory, { description: 'Update an existing inventory item identified by its ID.' })
  @Roles(UserRole.admin, UserRole.manager)
  async updateInventory(
    @Args('id', { description: 'The unique identifier of the inventory item to be updated.' }) id: string,
    @Args('updateInventoryInput', { description: 'The new details to update the inventory item with.' })
    updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.findOneAndUpdate(id, updateInventoryInput);
  }

  @Mutation(() => Boolean, { description: 'Delete an inventory item identified by its ID.' })
  @Roles(UserRole.admin, UserRole.manager)
  async deleteInventory(
    @Args('id', { description: 'The unique identifier of the inventory item to be deleted.' }) id: string,
  ): Promise<boolean> {
    await this.inventoryService.deleteById(id);
    return true;
  }

  @ResolveField(() => Product, { description: 'Resolve the product details associated with the inventory item.' })
  async product(@Parent() inventory: Inventory): Promise<Product> {
    return this.productService.findOneById(inventory.product as string);
  }
}

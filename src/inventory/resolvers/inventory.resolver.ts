import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { InventoryService } from '../services/inventory.service';
import { Inventory } from '../entities';
import { CreateInventoryInput, GetInventoryOutput, InventoryFilterInput, UpdateInventoryInput } from '../dtos';
import { UserRole } from 'src/user';

@Resolver(() => Inventory)
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryResolver {
  constructor(private inventoryService: InventoryService) {}


  @Query(() => GetInventoryOutput)
  async getInventory(
    @Args('filter', { type: () => InventoryFilterInput, nullable: true }) filter: InventoryFilterInput,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ): Promise<GetInventoryOutput> {
    return this.inventoryService.findAllWithFilterAndCount(filter, page, limit);
  }

  @Query(() => Inventory)
  async getInventoryById(@Args('id') id: string): Promise<Inventory> {
    return this.inventoryService.findOneById(id);
  }

  @Mutation(() => Inventory)
  @Roles(UserRole.admin, UserRole.manager)
  async createInventory(@Args('createInventoryInput') createInventoryInput: CreateInventoryInput): Promise<Inventory> {
    return this.inventoryService.create(createInventoryInput);
  }

  @Mutation(() => Inventory)
  @Roles(UserRole.admin, UserRole.manager)
  async updateInventory(
    @Args('id') id: string,
    @Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput,
  ): Promise<Inventory> {
    return this.inventoryService.findOneAndUpdate(id, updateInventoryInput);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.admin, UserRole.manager)
  async deleteInventory(@Args('id') id: string): Promise<boolean> {
    await this.inventoryService.deleteById(id);
    return true
  }
}

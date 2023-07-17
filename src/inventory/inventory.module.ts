import { Module } from '@nestjs/common';
import { InventoryService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entities';
import { InventoryResolver } from './resolvers';
import { ProductModule } from 'src/product';

@Module({
  imports: [MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]), ProductModule],
  exports: [InventoryService],
  providers: [InventoryService, InventoryResolver],
})
export class InventoryModule {}

import { Module } from '@nestjs/common';
import { InventoryService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entities';
import { InventoryResolver } from './resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
  ],
  exports: [InventoryService],
  providers: [InventoryService, InventoryResolver]
})
export class InventoryModule {}

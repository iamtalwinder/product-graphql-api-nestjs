import { Module } from '@nestjs/common';
import { InventoryService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
  ],
  exports: [InventoryService],
  providers: [InventoryService]
})
export class InventoryModule {}

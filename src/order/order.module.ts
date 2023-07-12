import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user';
import { InventoryModule } from 'src/inventory';
import { ProductModule } from 'src/product';
import { OrderService } from './services';
import { OrderResolver } from './resolvers';
import { Order, OrderSchema } from './entities';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule, UserModule, InventoryModule],
})
export class OrderModule {}

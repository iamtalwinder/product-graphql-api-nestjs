import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderResolver } from './resolvers';
import { ProductModule } from '../product';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [ProductModule],
})
export class OrderModule {}

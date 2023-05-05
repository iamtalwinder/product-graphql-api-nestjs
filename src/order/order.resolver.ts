import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Resolver(of => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService
  ) {}

  @Mutation(returns => Order)
  async createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(returns => Order)
  async order(@Args('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Mutation(returns => Order)
  async updateOrderStatus(@Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput) {
    return this.orderService.updateStatus(updateOrderStatusInput);
  }

  @Mutation(returns => Boolean)
  async deleteOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @Query(returns => [Order])
  async orders() {
    return this.orderService.findAll();
  }

  @ResolveField('items', returns => [Product])
  async getItems(@Parent() order: Order) {
    const itemIds = order.items;
    return this.productService.findAll();
  }
}

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderStatusInput } from '../dto/update-order-status.input';
import { Product, ProductService } from '../../product';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => Order)
  async order(@Args('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @Mutation(() => Order)
  async updateOrderStatus(
    @Args('updateOrderStatusInput')
    updateOrderStatusInput: UpdateOrderStatusInput,
  ) {
    return this.orderService.updateStatus(updateOrderStatusInput);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @Query(() => [Order])
  async orders() {
    return this.orderService.findAll();
  }
}

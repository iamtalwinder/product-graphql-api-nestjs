import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
@Module({
  imports: [
    ProductModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      path: '/product',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

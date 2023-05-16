import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { GqlErrorFormatter } from 'src/common';
import { ProductModule } from 'src/product';
import { OrderModule } from 'src/order';
import { UserModule } from 'src/user';
import { AuthModule } from 'src/auth';
import environment from 'src/environment';
@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      path: '/product',
      formatError: GqlErrorFormatter.formatError,
    }),
    ProductModule,
    OrderModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

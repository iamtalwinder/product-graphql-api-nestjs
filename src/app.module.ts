import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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
      autoSchemaFile: 'schema.gql',
      playground: false,
      installSubscriptionHandlers: true,
      path: '/product',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { StockModule } from './stock/stock.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ProductsModule,
    EventsModule,
    StockModule,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventsModule } from './events/events.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: 'postgres',
      type: 'postgresql',
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      port: 5432,
    }),
    ProductsModule,
    EventsModule,
    StockModule,
  ],
})
export class AppModule { }

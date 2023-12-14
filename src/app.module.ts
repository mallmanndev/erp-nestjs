import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { StockModule } from './stock/stock.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@prisma_module/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    EventEmitterModule.forRoot({ wildcard: true }),
    PrismaModule,
    AuthModule,
    TenantModule,
    ProductsModule,
    EventsModule,
    StockModule,
  ],
})
export class AppModule { }

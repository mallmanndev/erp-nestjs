import { Module } from "@nestjs/common";
import { ProductCreatedListener } from "./application/listeners/product-created.listener";
import { StocksRepository } from "./application/repositories/stocks.repository";
import { CreateStockUseCase } from "./application/use-cases/create-stock.use-case";
import { PrismaService } from "@/prisma.service";

@Module({
    imports: [],
    providers: [
        PrismaService,
        CreateStockUseCase,
        ProductCreatedListener,
        { provide: 'StocksContract', useClass: StocksRepository },
    ],
    exports: [],
})
export class StockModule { }
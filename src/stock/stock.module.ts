import { Module } from "@nestjs/common";
import { ProductCreatedListener } from "./application/listeners/product-created.listener";
import { StocksRepository } from "./application/adapters/repositories/stocks.repository";
import { CreateStockUseCase } from "./application/use-cases/create-stock.use-case";
import { PrismaService } from "@/prisma.service";
import { StocksResolver } from "./application/adapters/graphql/stocks.resolver";
import { InputStockUseCase } from "./application/use-cases/input-stock.use-case";
import { OutputStockUseCase } from "./application/use-cases/output-stock.use-case";
import { StockFacade } from "./application/facade/stock.facade";
import { GetStockUseCase } from "./application/use-cases/get-stock.use-case";

@Module({
    imports: [],
    providers: [
        PrismaService,
        CreateStockUseCase,
        InputStockUseCase,
        OutputStockUseCase,
        GetStockUseCase,
        ProductCreatedListener,
        StocksResolver,
        { provide: "IStockFacade", useClass: StockFacade },
        { provide: 'StocksContract', useClass: StocksRepository },
    ],
    exports: [
        { provide: "IStockFacade", useClass: StockFacade },
    ],
})
export class StockModule { }
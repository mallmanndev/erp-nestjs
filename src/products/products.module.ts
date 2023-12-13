import { Module } from "@nestjs/common";
import { ProductsController } from "./application/adapters/rest/products.controller";
import { ProductsRepository } from "./application/adapters/repositories/products.repository";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { PrismaService } from "@/prisma.service";
import { UpdateProductUseCase } from "./application/use-cases/update-product.use-case";
import { DeleteProductUseCase } from "./application/use-cases/delete-product.use-case";
import { StockModule } from "@stock/stock.module";
import { ProductsResolver } from "./application/adapters/graphql/products.resolver";

@Module({
    imports: [StockModule],
    controllers: [ProductsController],
    providers: [
        PrismaService,
        CreateProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        ProductsResolver,
        { provide: "IProductsRepository", useClass: ProductsRepository },
    ],
})
export class ProductsModule { }
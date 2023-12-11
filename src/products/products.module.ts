import { Module } from "@nestjs/common";
import { ProductsController } from "./application/adapters/rest/products.controller";
import { ProductsRepository } from "./application/adapters/repositories/products.repository";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { PrismaService } from "@/prisma.service";
import { ProductsResolver } from "./application/adapters/graphql/products.resolver";

@Module({
    controllers: [ProductsController],
    providers: [
        PrismaService,
        CreateProductUseCase,
        ProductsResolver,
        { provide: "IProductsRepository", useClass: ProductsRepository },
    ],
})
export class ProductsModule { }
import { Module } from "@nestjs/common";
import { ProductsController } from "./application/adapters/rest/products.controller";
import { ProductsRepository } from "./application/adapters/repositories/products.repository";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Product } from "./domain/entities/product";

@Module({
    imports: [MikroOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [
        CreateProductUseCase,
        { provide: "IProductsRepository", useClass: ProductsRepository },
    ],
})
export class ProductsModule { }
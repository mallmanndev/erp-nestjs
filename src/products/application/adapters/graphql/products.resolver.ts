import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product } from "./models/product.model";
import { ListProductsUseCase } from "../../use-cases/list-products.use-case";
import { CreateProductUseCase } from "../../use-cases/create-product.use-case";
import { CreateProductDto } from "../../dtos/create-product.dto";

@Resolver(of => Product)
export class ProductsResolver {
    constructor(
        private readonly listProductsUseCase: ListProductsUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
    ) { }

    @Query(returns => [Product])
    async products() {
        return this.listProductsUseCase.execute();
    }

    @Mutation(returns => Product)
    async createProduct(@Args('data') data: CreateProductDto) {
        return this.createProductUseCase.execute(data);
    }
}
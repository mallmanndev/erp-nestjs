import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { CreateProductUseCase } from "../../use-cases/create-product.use-case";
import { ListProductsUseCase } from "../../use-cases/list-products.use-case";

@Controller("products")
export class ProductsController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly listProductsUseCase: ListProductsUseCase,
    ) { }

    @Get()
    getProducts() {
        return this.listProductsUseCase.execute();
    }

    @Post()
    async create(
        @Body() body: CreateProductDto
    ) {
        return this.createProductUseCase.execute(body);
    }
}
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { CreateProductUseCase } from "../../use-cases/create-product.use-case";
import { IProductsRepository } from "src/products/domain/ports/products-repository.contract";

@Controller("products")
export class ProductsController {
    constructor(
        @Inject("IProductsRepository")
        private readonly productsRepository: IProductsRepository,
        private readonly createProductUseCase: CreateProductUseCase,
    ) { }

    @Get()
    getProducts() {
        return this.productsRepository.findAll();
    }

    @Post()
    async create(
        @Body() body: CreateProductDto
    ) {
        const product = await this.createProductUseCase.execute(body);
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            createdAt: product.createdAt,
        }
    }
}
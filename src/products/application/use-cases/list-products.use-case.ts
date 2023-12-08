import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/products/domain/entities/product";
import { IProductsRepository } from "src/products/domain/ports/products-repository.contract";

@Injectable()
export class ListProductsUseCase {
    constructor(
        @Inject("IProductsRepository")
        private readonly productsRepository: IProductsRepository,
    ) { }

    async execute(): Promise<Product[]> {
        return this.productsRepository.findAll();
    }
}
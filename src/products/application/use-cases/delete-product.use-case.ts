import { IProductsRepository } from "@products/domain/ports/products-repository.contract";
import { IStockFacade } from "@stock/domain/ports/stock.facade";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productsRepository: IProductsRepository,
        @Inject('IStockFacade')
        private readonly stockFacade: IStockFacade
    ) { }

    async execute(id: string) {
        const product = await this.productsRepository.findById(id);
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        const stock = await this.stockFacade.getStockByProductId(id);
        if (stock.quantity > 0) {
            throw new Error('Produto possui estoque');
        }

        product.delete();

        await this.productsRepository.update(product)
        return true;
    }
}
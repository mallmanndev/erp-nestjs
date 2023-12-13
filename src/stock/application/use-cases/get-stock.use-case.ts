import { Inject, Injectable } from "@nestjs/common";
import { Stock } from "@stock/domain/entities/stock";
import { StocksContract } from "@stock/domain/ports/stocks.contract";

@Injectable()
export class GetStockUseCase {
    constructor(
        @Inject('StocksContract')
        private readonly stocksRepository: StocksContract
    ) {}

    async execute(productId: string): Promise<Stock> {
        const stock = await this.stocksRepository.findByProductId(productId);
        if (!stock) {
            throw new Error('Estoque não existe.');
        }

        return stock
    }
}
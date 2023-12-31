import { StocksContract } from "@stock/domain/ports/stocks.contract";

export class StocksRepository implements StocksContract {
    public stocks = [];

    async create(stock) {
        this.stocks.push(stock);
    }

    async update(stock) {
        const index = this.stocks.findIndex(s => s.id === stock.id);
        this.stocks[index] = stock;
    }

    async findByProductId(productId) {
        return this.stocks.find(s => s.productId === productId);
    }
}
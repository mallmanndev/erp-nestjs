import { Stock } from "@stock/domain/entities/stock";

export interface StocksContract {
    create(stock: Stock): Promise<void>;
    update(stock: Stock): Promise<void>;
    findByProductId(productId: string): Promise<Stock>;
}
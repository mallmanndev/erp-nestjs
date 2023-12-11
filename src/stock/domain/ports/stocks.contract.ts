import { Stock } from "@stock/domain/entities/stock";

export interface StocksContract {
    create(stock: Stock): Promise<void>;
    update(stock: Stock): Promise<void>;
    delete(stock: Stock): Promise<void>;
    findById(id: string): Promise<Stock>;
    findByProductId(productId: string): Promise<Stock>;
}
import { Stock } from "../entities/stock";

export interface IStockFacade {
    getStockByProductId(productId: string): Promise<Stock>;
}

import { Stock } from "@stock/domain/entities/stock";
import { IStockFacade } from "@stock/domain/ports/stock.facade";
import { GetStockUseCase } from "../use-cases/get-stock.use-case";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StockFacade implements IStockFacade {
    constructor(private readonly getStockUseCase: GetStockUseCase) { }

    getStockByProductId(productId: string): Promise<Stock> {
        return this.getStockUseCase.execute(productId);
    }
}
import { StocksContract } from "@/stock/domain/ports/stocks.contract";
import { InputStockDTO, InputStockOutputDTO } from "../dtos/input-stock.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Inject, Injectable } from "@nestjs/common";
import { StockImputedEvent } from "../events/stock-imputed.event";

@Injectable()
export class InputStockUseCase {
    constructor(
        @Inject("StocksContract")
        private readonly stocksRepository: StocksContract,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(data: InputStockDTO): Promise<InputStockOutputDTO> {
        const stock = await this.stocksRepository.findByProductId(data.productId)
        if (!stock) {
            throw new Error("Estoque não existe.")
        }

        stock.input(data.quantity)
        await this.stocksRepository.update(stock)

        const event = new StockImputedEvent(
            stock.id,
            stock.productId,
            stock.productName,
            stock.quantityType,
            stock.quantity)
        this.eventEmitter.emit("stock.inputed", event)

        return new InputStockOutputDTO({
            stockId: stock.id,
            quantity: stock.quantity,
            productId: stock.productId,
            productName: stock.productName,
            quantityType: stock.quantityType
        })
    }
}
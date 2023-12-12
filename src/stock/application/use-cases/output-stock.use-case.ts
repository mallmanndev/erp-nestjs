import { StocksContract } from "@/stock/domain/ports/stocks.contract";
import { OutputStockInputDTO, OutputStockOutputDTO } from "../dtos/output-stock.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Inject, Injectable } from "@nestjs/common";
import { StockOutputedEvent } from "../events/stock-outputed.event";

@Injectable()
export class OutputStockUseCase {
    constructor(
        @Inject("StocksContract")
        private readonly stocksRepository: StocksContract,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(data: OutputStockInputDTO): Promise<OutputStockOutputDTO> {
        const stock = await this.stocksRepository.findByProductId(data.productId)
        if (!stock) {
            throw new Error("Estoque não existe.")
        }

        stock.output(data.quantity)
        await this.stocksRepository.update(stock)

        const event = new StockOutputedEvent(
            stock.id, 
            stock.productId, 
            stock.productName, 
            stock.quantityType, 
            stock.quantity)
        this.eventEmitter.emit("stock.outputed", event)

        return new OutputStockOutputDTO({
            stockId: stock.id,
            quantity: stock.quantity,
            productId: stock.productId,
            productName: stock.productName,
            quantityType: stock.quantityType,
        })
    }
}
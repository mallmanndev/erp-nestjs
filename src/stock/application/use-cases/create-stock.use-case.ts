import { StocksContract } from "@stock/domain/ports/stocks.contract";
import { CreateStockDTO } from "../dtos/create-stock.dto";
import { Stock } from "@stock/domain/entities/stock";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { StockCreatedEvent } from "../events/stock-created.event";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateStockUseCase {
    constructor(
        @Inject("StocksContract")
        private readonly stocksRepository: StocksContract,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(data: CreateStockDTO): Promise<void> {
        const stocks = await this.stocksRepository.findByProductId(data.productId);
        if (stocks) {
            throw new Error("Estoque já existe.");
        }

        const stock = Stock.create(
            data.productId,
            data.productName,
            data.quantityType,
            data.quantity,
        );
        await this.stocksRepository.create(stock);

        const event = new StockCreatedEvent(
            stock.id,
            stock.productId,
            stock.productName,
            stock.quantityType,
            stock.quantity,
            stock.createdAt,
        );
        this.eventEmitter.emit("stock.created", event);
    }
}
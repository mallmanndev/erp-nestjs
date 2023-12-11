import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateStockUseCase } from "../use-cases/create-stock.use-case";
import { CreateStockDTO } from "../dtos/create-stock.dto";
import { ProductCreatedEvent } from "@/products/application/events/product-created.event";

@Injectable()
export class ProductCreatedListener {
    constructor(private readonly createStock: CreateStockUseCase) { }

    @OnEvent('product.created')
    async handle(data: ProductCreatedEvent) {
        const dto = new CreateStockDTO({
            productId: data.id,
            productName: data.name,
            quantityType: data.quantityType,
            quantity: data.quantity,
        })

        await this.createStock.execute(dto);
    }
}
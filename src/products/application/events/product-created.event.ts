import { Price } from "src/products/domain/entities/price";

export class ProductCreatedEvent {
    public readonly event = 'product.created';
    public readonly version = 1;
    public readonly date: Date

    constructor(
        public readonly id: string,
        public readonly barcode: string,
        public readonly sku: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: Price,
        public readonly createdAt: Date,
        public readonly quantity: number,
        public readonly quantityType: string,
    ) {
        this.date = new Date();
    }
}
export class StockCreatedEvent {
    public id: string;
    public readonly event = 'stock.created';
    public readonly version = 1;
    public readonly date: Date

    constructor(
        public readonly stockId: string,
        public readonly productId: string,
        public readonly productName: string,
        public readonly quantityType: string,
        public readonly quantity: number,
        public readonly createdAt: Date,
    ) {
        this.id = stockId;
        this.date = new Date();
    }
}
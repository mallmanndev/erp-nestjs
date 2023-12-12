export class StockOutputedEvent {
    public id: string;
    public readonly event = 'stock.outputed';
    public readonly version = 1;
    public readonly date: Date

    constructor(
        public readonly stockId: string,
        public readonly productId: string,
        public readonly productName: string,
        public readonly quantityType: string,
        public readonly quantity: number,
    ) {
        this.id = crypto.randomUUID()
        this.date = new Date();
    }
}
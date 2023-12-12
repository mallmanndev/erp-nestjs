export class ProductAlteredEvent {
    public readonly id: string;
    public readonly event = 'product.altered';
    public readonly version = 1;
    public readonly date: Date

    constructor(
        public readonly productId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly gender?: string,
        public readonly model?: string,
        public readonly material?: string,
        public readonly brand?: string,
        public readonly weight?: number,
        public readonly size?: string,
        public readonly color?: string,
    ) {
        this.id = crypto.randomUUID()
        this.date = new Date();
    }
}
export class Quantity {
    public readonly quantity: number;
    public readonly type: string;

    constructor(data: Partial<Quantity>) {
        Object.assign(this, data);
    }

    static create(quantity: number, type: string) {
        return new Quantity({ quantity, type });
    }
}
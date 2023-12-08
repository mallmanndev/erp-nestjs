export class Price {
    public readonly price: number;
    public readonly coastPrice: number;
    public readonly currency: string;

    constructor(data: Partial<Price>) {
        Object.assign(this, data);
    }

    static create(
        price: number,
        coastPrice: number,
        currency: string,
    ) {
        return new Price({ price, coastPrice, currency });
    }

    get profit() {
        return this.price - this.coastPrice;
    }
}

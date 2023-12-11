export class Price {
    private _price: number;
    private _coastPrice: number;
    private _currency: string;
    private _date: Date;

    constructor(
        data: Partial<{
            price: number,
            coastPrice: number,
            currency: string,
            date: Date,
        }>
    ) {
        this._price = data.price;
        this._coastPrice = data.coastPrice;
        this._currency = data.currency;
        this._date = data.date
    }

    static create(
        price: number,
        coastPrice: number,
        currency: string,
    ) {
        return new Price({ price, coastPrice, currency, date: new Date() });
    }

    get profit() {
        return this._price - this._coastPrice;
    }

    get price() {
        return this._price;
    }

    get coastPrice() {
        return this._coastPrice;
    }

    get currency() {
        return this._currency;
    }

    get date() {
        return this._date;
    }
}

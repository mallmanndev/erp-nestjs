import { Stock } from "./stock";
import { randomUUID } from "node:crypto";

export enum MovementType {
    INPUT = "input",
    OUTPUT = "output",
}

export class Movement {
    private _id: string;
    private _stock: Stock;
    private _stock_id: string;
    private _quantity: number;
    private _type: "input" | "output";
    private _date: Date;

    constructor(data: any) {
        Object.assign(this, data);
    }

    static create(stock_id: string, quantity: number, type: string) {
        return new Movement({
            _id: randomUUID(),
            _stock_id: stock_id,
            _quantity: quantity,
            _type: type,
            _date: new Date(),
        });
    }

    get id() {
        return this._id;
    }

    get quantity() {
        return this._quantity;
    }

    get type() {
        return this._type;
    }

    get stock_id() {
        return this._stock_id;
    }

    get date() {
        return this._date;
    }
}
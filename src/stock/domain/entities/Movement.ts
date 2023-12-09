import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Stock } from "./stock";

export enum MovementType {
    INPUT = "input",
    OUTPUT = "output",
}

@Entity({ tableName: "stock_movements" })
export class Movement {
    @PrimaryKey({ name: "id" })
    private _id: string;

    @ManyToOne(() => Stock, { name: "stock_id" })
    private _stock: Stock;

    @Property({ name: "quantity" })
    private _quantity: number;

    @Enum({ name: "type", items: () => MovementType })
    private _type: "input" | "output";

    @Property({ name: "date" })
    private _date: Date;

    constructor(data: any) {
        Object.assign(this, data);
    }

    static create(stock_id: string, quantity: number, type: string) {
        return new Movement({
            _id: crypto.randomUUID(),
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

    get stock() {
        return this._stock;
    }

    get date() {
        return this._date;
    }
}
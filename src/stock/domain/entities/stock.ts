import { Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { Movement } from "./Movement";

@Entity({ tableName: "stock" })
export class Stock {

    @Property({ primary: true, name: "product_id" })
    private _id: string;

    @Property({ name: "product_id" })
    private _productId: string;

    @Property({ name: "product_name" })
    private _productName: string;

    @Property({ name: "quantity_type" })
    private _quantityType: string;

    @Property({ name: "quantity" })
    private _quantity: number;

    @Property({ name: "createdAt" })
    private _createdAt: Date;

    @OneToMany("Movement", "_stock")
    private _movements: Movement[]

    constructor(data: any) {
        Object.assign(this, data);
    }

    static create(productId: string, productName: string, quantityType: string, quantity: number) {
        const stock_id = crypto.randomUUID();
        const mov = Movement.create(stock_id, quantity, "Initial stock");
        const stock = new Stock({
            _id: stock_id,
            _productId: productId,
            _productName: productName,
            _quantityType: quantityType,
            _quantity: quantity,
            _createdAt: new Date(),
        });
        stock.addMovement(mov);
        return stock;
    }

    private addMovement(movement: Movement) {
        this._movements.push(movement);
    }

    public input(quantity: number) {
        if (quantity <= 0)
            throw new Error("Quantidade inválida.");

        const mov = Movement.create(this._id, quantity, "input");
        this.addMovement(mov);
        this._quantity += quantity;
    }

    public output(quantity: number) {
        if (this._quantity <= 0 || this._quantity < quantity)
            throw new Error("Estoque insuficiente.");

        const mov = Movement.create(this._id, quantity, "output");
        this.addMovement(mov);
        this._quantity -= quantity;
    }

    get id() {
        return this._id;
    }

    get productId() {
        return this._productId;
    }

    get productName() {
        return this._productName;
    }

    get quantityType() {
        return this._quantityType;
    }

    get quantity() {
        return this._quantity;
    }

    get createdAt() {
        return this._createdAt;
    }
}
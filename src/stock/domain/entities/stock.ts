import { Movement } from "./Movement";
import { randomUUID } from "node:crypto";

export class Stock {
    private _id: string;
    private _productId: string;
    private _productName: string;
    private _quantityType: string;
    private _quantity: number;
    private _createdAt: Date;
    private _movements: Movement[]

    constructor(
        data: Partial<{
            id: string,
            productId: string,
            productName: string,
            quantityType: string,
            quantity: number,
            createdAt: Date,
            movements: Movement[],
        }>
    ) {
        this._id = data.id;
        this._productId = data.productId;
        this._productName = data.productName;
        this._quantityType = data.quantityType;
        this._quantity = data.quantity;
        this._createdAt = data.createdAt;
        this._movements = data.movements;
    }

    static create(productId: string, productName: string, quantityType: string, quantity: number) {
        if (quantity < 0) {
            throw new Error("Quantidade inválida.");
        }

        const stock_id = randomUUID();
        const mov = Movement.create(stock_id, quantity, "input");
        const stock = new Stock({
            id: stock_id,
            productId,
            productName,
            quantityType,
            quantity,
            createdAt: new Date(),
            movements: [],
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

    get movements() {
        return this._movements;
    }
}
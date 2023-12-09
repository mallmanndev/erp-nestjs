import { Price } from './price';
import { AdditionalField } from './additional-field';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Dimension } from './dimension';

@Entity({ tableName: "products" })
export class Product {
    // Identifiers
    @PrimaryKey({ type: 'uuid', name: "id" })
    private _id: string;

    @Property({ unique: true, name: "barcode", nullable: true })
    private _barcode: string | null;

    @Property({ unique: true, name: "sku", nullable: true })
    private _sku: string | null;

    @Property({ name: "name" })
    private _name: string;

    @Property({ name: 'description' })
    private _description: string;
    private _price: Price;

    private _gender: string;
    private _model: string;
    private _material: string;
    private _brand: string;
    private _weight: number;
    private _size: string;
    private _color: string;
    private _dimensions: Dimension;

    // Additional
    private _additionalFields: AdditionalField[];

    // Timestamps
    @Property({ name: "created_at" })
    private _createdAt: Date;

    @Property({ name: "updated_at", nullable: true })
    private _updatedAt: Date;

    @Property({ name: "inactived_at", nullable: true })
    private _inactivedAt: Date;

    constructor(data: any) {
        Object.assign(this, data);
    }

    static create(
        barcode: string,
        sku: string,
        name: string,
        description: string,
        price: Price,
    ) {
        return new Product({
            _id: crypto.randomUUID(),
            _barcode: barcode || null,
            _sku: sku || null,
            _name: name,
            _description: description,
            _price: price,
            _createdAt: new Date(),
        });
    }

    // Getters
    get id(): string {
        return this._id;
    }

    get barcode(): string {
        return this._barcode;
    }

    get sku(): string {
        return this._sku;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get price(): Price {
        return this._price;
    }

    get gender(): string {
        return this._gender
    }

    get model(): string {
        return this._model;
    }

    get material(): string {
        return this._material;
    }

    get brand(): string {
        return this._brand;
    }

    get weight(): number {
        return this._weight;
    }

    get size(): string {
        return this._size;
    }

    get color(): string {
        return this._color;
    }

    get dimensions(): Dimension {
        return this._dimensions;
    }

    get additionalFields(): AdditionalField[] {
        return this._additionalFields;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get inactivedAt(): Date {
        return this._inactivedAt;
    }
}
import { Price } from './price';
import { AdditionalField } from './additional-field';
import { Characteristic } from './characteristics';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: "products" })
export class Product {
    // Identifiers
    @PrimaryKey({ type: 'uuid', name: "id" })
    private _id: string;

    @Property({ unique: true, name: "barcode" })
    private _barcode: string;

    @Property({ unique: true, name: "sku" })
    private _sku: string;

    @Property({ name: "name" })
    private _name: string;

    @Property({ name: 'description' })
    private _description: string;
    private _price: Price;

    private _characteristics: Characteristic;

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
            _barcode: barcode,
            _sku: sku,
            _name: name,
            _description: description,
            _price: price,
            _createdAt: new Date(),
        });
    }

    async changeCharacteristic(characteristics: Characteristic) {
        this._characteristics = characteristics;
    }

    async addAdditionalFields(additionalFields: AdditionalField) {
        this._additionalFields.push(additionalFields);
    }

    async removeAdditionalFields(additionalFields: AdditionalField) {
        this._additionalFields = this._additionalFields.filter((field) => field.name !== additionalFields.name);
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

    get characteristics(): Characteristic {
        return this._characteristics;
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
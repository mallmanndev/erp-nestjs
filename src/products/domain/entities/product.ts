import { Price } from './price';
import { AdditionalField } from './additional-field';
import { Dimension } from './dimension';

export class Product {
    private _id: string;
    private _barcode: string;
    private _sku: string;
    private _name: string;
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
    private _additionalFields: AdditionalField[];
    private _createdAt: Date;
    private _updatedAt: Date;
    private _deletedAt: Date;

    constructor(
        data: Partial<{
            id: string;
            barcode: string;
            sku: string;
            name: string;
            description: string;
            price: Price;
            gender: string;
            model: string;
            material: string;
            brand: string;
            weight: number;
            size: string;
            color: string;
            dimensions: Dimension;
            additionalFields: AdditionalField[];
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
        }>
    ) {
        this._id = data.id;
        this._barcode = data.barcode;
        this._sku = data.sku;
        this._name = data.name;
        this._description = data.description;
        this._price = data.price;
        this._gender = data.gender
        this._model = data.model;
        this._material = data.material;
        this._brand = data.brand;
        this._weight = data.weight;
        this._size = data.size;
        this._color = data.color;
        this._dimensions = data.dimensions;
        this._additionalFields = data.additionalFields;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._deletedAt = data.deletedAt;
    }

    static create(
        data: {
            barcode: string,
            sku: string,
            name: string,
            description: string,
            price: Price,
            gender?: string,
            model?: string,
            material?: string,
            brand?: string,
            weight?: number,
            size?: string,
            color?: string,
            additionalFields?: AdditionalField[],
        }
    ) {
        return new Product({
            id: crypto.randomUUID(),
            createdAt: new Date(),
            ...data
        });
    }

    update(
        data: {
            name: string,
            description: string,
            gender?: string,
            model?: string,
            material?: string,
            brand?: string,
            weight?: number,
            size?: string,
            color?: string
        }
    ) {
        this._name = data.name;
        this._description = data.description;
        this._gender = data.gender
        this._model = data.model;
        this._material = data.material;
        this._brand = data.brand;
        this._weight = data.weight;
        this._size = data.size;
        this._color = data.color;
        this._updatedAt = new Date();
    }

    delete() {
        this._deletedAt = new Date();
    }

    get id() {
        return this._id;
    }

    get barcode() {
        return this._barcode;
    }

    get sku() {
        return this._sku;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get gender() {
        return this._gender
    }

    get model() {
        return this._model
    }

    get material() {
        return this._material
    }

    get brand() {
        return this._brand
    }

    get weight() {
        return this._weight
    }

    get size() {
        return this._size
    }

    get color() {
        return this._color
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get deletedAt() {
        return this._deletedAt;
    }
}
import { Dimension } from "./dimension";

export class Characteristic {
    private _gender: string;
    private _model: string;
    private _material: string;
    private _brand: string;
    private _weight: number;
    private _size: string;
    private _color: string;
    private _dimensions: Dimension;

    constructor(data: any) {
        Object.assign(this, data);
    }

    public static create(
        gender: string,
        model: string,
        material: string,
        brand: string,
        weight: number,
        size: string,
        color: string,
        dimensions: Dimension,

    ){
        const obj = new Characteristic({})
        obj._gender = gender;
        obj._model = model;
        obj._material = material;
        obj._brand = brand;
        obj._weight = weight;
        obj._size = size;
        obj._color = color;
        obj._dimensions = dimensions;
        return obj;
    }

    // Getters
    get gender(): string {
        return this._gender;
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
}
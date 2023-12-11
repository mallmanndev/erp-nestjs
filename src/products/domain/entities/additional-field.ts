export class AdditionalField {
    private _name: string
    private _value: string

    constructor(
        data: Partial<{
            name: string,
            value: string,
        }>
    ) {
        this._name = data.name;
        this._value = data.value;
    }

    public static create(
        name: string,
        value: string,
    ) {
        return new AdditionalField({ name, value });
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }
}

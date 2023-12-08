export class AdditionalField {
    public name: string
    public value: string

    constructor() { }

    public static create(
        name: string,
        value: string,
    ) {
        const obj = new AdditionalField();
        obj.name = name;
        obj.value = value;
        return obj;
    }
}

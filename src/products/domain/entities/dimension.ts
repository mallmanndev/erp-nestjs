export class Dimension {
    public readonly height: number
    public readonly width: number
    public readonly depth: number

    constructor(data: Partial<Dimension>) {
        Object.assign(this, data);
    }

    public static create(
        height: number,
        width: number,
        depth: number,
    ) {
        return new Dimension({ height, width, depth });
    }
}
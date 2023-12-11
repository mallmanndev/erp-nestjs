export class Dimension {
    private _height: number
    private _width: number
    private _depth: number

    constructor(
        data: Partial<{
            height: number,
            width: number,
            depth: number,
        }>
    ) {
        this._height = data.height;
        this._width = data.width;
        this._depth = data.depth;
    }

    public static create(
        height: number,
        width: number,
        depth: number,
    ) {
        return new Dimension({ height, width, depth });
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get depth() {
        return this._depth;
    }
}
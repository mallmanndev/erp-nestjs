import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class InputStockDTO {
    @Field(type => String)
    productId: string;

    @Field(type => Number)
    quantity: number;

    constructor(data: InputStockDTO) {
        Object.assign(this, data);
    }
}


@ObjectType()
export class InputStockOutputDTO {
    @Field(type => String)
    stockId: string

    @Field(type => String)
    productId: string

    @Field(type => String)
    productName: string

    @Field(type => String)
    quantityType: string

    @Field(type => Number)
    quantity: number

    constructor(data: InputStockOutputDTO) {
        Object.assign(this, data);
    }
}
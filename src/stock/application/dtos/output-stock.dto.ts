import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class OutputStockInputDTO {
    @Field(type => String)
    productId: string;

    @Field(type => Number)
    quantity: number;

    constructor(data: OutputStockInputDTO) {
        Object.assign(this, data)
    }
}

@ObjectType()
export class OutputStockOutputDTO {
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

    constructor(data: OutputStockOutputDTO) {
        Object.assign(this, data);
    }
}
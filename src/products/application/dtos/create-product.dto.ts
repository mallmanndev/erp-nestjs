import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateProductDto {
    @Field(type => String)
    barcode: string

    @Field(type => String)
    sku: string

    @Field(type => String)
    @IsNotEmpty({ message: "Nome é obrigatório!" })
    name: string

    @Field(type => String)
    @IsNotEmpty({ message: "Descrição é obrigatória!" })
    description: string

    @Field(type => Number)
    coastPrice: number

    @Field(type => Number)
    @IsNotEmpty({ message: "Preço é obrigatório!" })
    price: number

    @Field(type => Number)
    @IsNotEmpty({ message: "Estoque é obrigatório!" })
    stock: number

    @Field(type => String, { nullable: true })
    gender?: string

    @Field(type => String, { nullable: true })
    model?: string

    @Field(type => String, { nullable: true })
    material?: string

    @Field(type => String, { nullable: true })
    brand?: string

    @Field(type => Number, { nullable: true })
    weight?: number

    @Field(type => String, { nullable: true })
    size?: string

    @Field(type => String, { nullable: true })
    color?: string

    constructor(partial: Partial<CreateProductDto>) {
        Object.assign(this, partial)
    }
}
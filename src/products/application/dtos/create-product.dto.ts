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

    @Field(type => String)
    @IsNotEmpty({ message: "Imagem é obrigatória!" })
    image: string

    constructor(partial: Partial<CreateProductDto>) {
        Object.assign(this, partial)
    }
}
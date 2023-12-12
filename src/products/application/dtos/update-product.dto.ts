import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class UpdateProductDto {
    @Field(type => String)
    id: string

    @Field(type => String)
    @IsNotEmpty({ message: "Nome é obrigatório!" })
    name: string

    @Field(type => String)
    @IsNotEmpty({ message: "Descrição é obrigatória!" })
    description: string

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

    constructor(partial: Partial<UpdateProductDto>) {
        Object.assign(this, partial)
    }
}

@ObjectType()
export class UpdateProductOutputDto {
    @Field(type => String)
    id: string

    @Field(type => String)
    @IsNotEmpty({ message: "Nome é obrigatório!" })
    name: string

    @Field(type => String)
    @IsNotEmpty({ message: "Descrição é obrigatória!" })
    description: string

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

    constructor(partial: Partial<UpdateProductDto>) {
        Object.assign(this, partial)
    }
}
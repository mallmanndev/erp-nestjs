import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Product {
    @Field(type => String)
    id: string;

    @Field(type => String)
    name: string;

    @Field(type => String)
    description: string;

    @Field(type => Number)
    price: number;

    @Field(type => Date)
    createdAt: Date;

    @Field(type => Date, { nullable: true })
    updatedAt: Date;

    @Field(type => Date, { nullable: true })
    inactivedAt: Date;
}

import { Field, InputType, ObjectType } from "@nestjs/graphql"

@InputType()
export class LoginInputDTO {
    @Field()
    email: string

    @Field()
    password: string

    constructor(data: { email: string, password: string }) {
        Object.assign(this, data)
    }
}

@ObjectType()
export class LoginOutputDTO {
    @Field()
    token: string

    constructor(data: { token: string }) {
        Object.assign(this, data)
    }
}
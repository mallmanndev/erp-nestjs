import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { LoginInputDTO, LoginOutputDTO } from "../../dtos/login.dto";
import { LoginUseCase } from "../../use-cases/login.use-case";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) { }

    @Mutation(returns => LoginOutputDTO)
    async login(@Args('data') data: LoginInputDTO) {
        return this.loginUseCase.execute(data)
    }
}
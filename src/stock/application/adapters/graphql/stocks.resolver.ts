import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { InputStockDTO, InputStockOutputDTO } from "../../dtos/input-stock.dto";
import { InputStockUseCase } from "../../use-cases/input-stock.use-case";
import { OutputStockInputDTO, OutputStockOutputDTO } from "../../dtos/output-stock.dto";
import { OutputStockUseCase } from "../../use-cases/output-stock.use-case";
import { UseGuards } from "@nestjs/common";
import { AuthGraphqlGuard } from "@auth/auth-graphql.guard";

@Resolver()
@UseGuards(AuthGraphqlGuard)
export class StocksResolver {
    constructor(
        private readonly inputStockUseCase: InputStockUseCase,
        private readonly outputStockUseCase: OutputStockUseCase,
    ) { }

    @Mutation(returns => InputStockOutputDTO)
    async inputStock(@Args('data') data: InputStockDTO) {
        return await this.inputStockUseCase.execute(data);
    }

    @Mutation(returns => OutputStockOutputDTO)
    async outputStock(@Args('data') data: OutputStockInputDTO) {
        return await this.outputStockUseCase.execute(data);
    }
}
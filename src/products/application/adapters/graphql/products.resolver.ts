import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product } from "./models/product.model";
import { CreateProductUseCase } from "../../use-cases/create-product.use-case";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { PrismaService } from "@/prisma.service";

@Resolver(of => Product)
export class ProductsResolver {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createProductUseCase: CreateProductUseCase,
    ) { }

    @Query(returns => [Product])
    async products() {
        return this.prismaService.product.findMany();
    }

    @Mutation(returns => Product)
    async createProduct(@Args('data') data: CreateProductDto) {
        return this.createProductUseCase.execute(data);
    }
}
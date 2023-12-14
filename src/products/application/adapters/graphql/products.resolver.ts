import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Product } from "./models/product.model";
import { CreateProductUseCase } from "../../use-cases/create-product.use-case";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { PrismaService } from "@prisma_module/prisma.service";
import { UpdateProductDto } from "../../dtos/update-product.dto";
import { UpdateProductUseCase } from "../../use-cases/update-product.use-case";
import { DeleteProductUseCase } from "../../use-cases/delete-product.use-case";
import { UseGuards } from "@nestjs/common";
import { AuthGraphqlGuard } from "@auth/auth-graphql.guard";
import { TenantService } from "@tenant/tenant.service";

@Resolver(of => Product)
@UseGuards(AuthGraphqlGuard)
export class ProductsResolver {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
        private readonly tenantService: TenantService,
    ) { }

    @Query(returns => [Product])
    async products() {
        return this.prismaService.product.findMany({ where: { tenantId: this.tenantService.tenantId } });
    }

    @Mutation(returns => Product)
    async createProduct(@Args('data') data: CreateProductDto) {
        return this.createProductUseCase.execute(data);
    }

    @Mutation(returns => Product)
    async updateProduct(@Args('data') data: UpdateProductDto) {
        return this.updateProductUseCase.execute(data);
    }

    @Mutation(returns => Boolean)
    async deleteProduct(@Args('id') id: string) {
        return await this.deleteProductUseCase.execute(id);
    }
}
import { Injectable } from "@nestjs/common";
import { Product } from "../../../domain/entities/product";
import { IProductsRepository } from "../../../domain/ports/products-repository.contract";
import { PrismaService } from "@prisma_module/prisma.service";
import { Currency } from "@prisma/client";
import { TenantService } from "@tenant/tenant.service";

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tenantService: TenantService,
    ) { }

    async create(product: Product): Promise<void> {
        await this.prisma.product.create({
            data: {
                id: product.id,
                barcode: product.barcode || null,
                sku: product.sku || null,
                name: product.name,
                description: product.description,
                brand: product.brand,
                color: product.color,
                gender: product.gender,
                material: product.material,
                model: product.model,
                size: product.size,
                weight: product.weight,
                createdAt: product.createdAt,
                tenantId: this.tenantService.tenantId,
                prices: {
                    create: {
                        price: product.price.price,
                        coastPrice: product.price.coastPrice,
                        currency: product.price.currency as Currency,
                        date: product.price.date,
                        tenantId: this.tenantService.tenantId,
                    }
                }
            }
        })
    }

    async update(product: Product): Promise<void> {
        await this.prisma.product.update({
            where: { id: product.id }, data: {
                name: product.name,
                description: product.description,
                brand: product.brand,
                color: product.color,
                gender: product.gender,
                material: product.material,
                model: product.model,
                size: product.size,
                weight: product.weight,
                updatedAt: product.updatedAt,
                deletedAt: product.deletedAt,
                tenantId: this.tenantService.tenantId,
            }
        })
    }

    async findByBarcode(barcode: string): Promise<Product> {
        const product = await this.prisma.product.findFirst({
            where: {
                barcode,
                tenantId: this.tenantService.tenantId,
                deletedAt: null
            }
        })
        return product ? new Product(product) : null
    }

    async findBySku(sku: string): Promise<Product> {
        const product = await this.prisma.product.findFirst({
            where: {
                sku,
                tenantId: this.tenantService.tenantId,
                deletedAt: null,
            }
        })
        return product ? new Product(product) : null
    }

    async findById(id: string): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
                tenantId: this.tenantService.tenantId,
                deletedAt: null,
            }
        })
        return product ? new Product(product) : null
    }
}
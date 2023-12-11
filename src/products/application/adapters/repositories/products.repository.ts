import { Injectable } from "@nestjs/common";
import { Product } from "../../../domain/entities/product";
import { IProductsRepository } from "../../../domain/ports/products-repository.contract";
import { PrismaService } from "@/prisma.service";
import { Currency } from "@prisma/client";

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(private readonly prisma: PrismaService) { }

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
                prices: {
                    create: {
                        price: product.price.price,
                        coastPrice: product.price.coastPrice,
                        currency: product.price.currency as Currency,
                        date: product.price.date,
                    }
                }
            }
        })
    }

    async update(product: Product): Promise<void> {
        await this.prisma.product.update({ where: { id: product.id }, data: product })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({ where: { id } })
    }

    async findByBarcode(barcode: string): Promise<Product> {
        // return await this.prisma.product.findUnique({ where: { barcode } })
        return null
    }

    async findBySku(sku: string): Promise<Product> {
        // return await this.prisma.product.findUnique({ where: { sku } })
        return null
    }

    async findAll(): Promise<Product[]> {
        // return await this.prisma.product.findMany()
        return null
    }

    async findById(id: string): Promise<Product> {
        // return await this.prisma.product.findUnique({ where: { id } })
        return null
    }
}
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Product } from "../../../domain/entities/product";
import { IProductsRepository } from "../../../domain/ports/products-repository.contract";

@Injectable()
export class ProductsRepository implements IProductsRepository {
    constructor(private em: EntityManager) { }

    async create(product: Product): Promise<void> {
        this.em.persist(product);
    }

    async update(product: Product): Promise<void> {
        this.em.persist(product);
    }

    async delete(id: string): Promise<void> {
        const product = this.em.getReference(Product, id);
        this.em.remove(product);
    }

    async findByBarcode(barcode: string): Promise<Product> {
        return this.em.findOne(Product, { barcode });
    }

    async findBySku(sku: string): Promise<Product> {
        return this.em.findOne(Product, { sku });
    }

    async findAll(): Promise<Product[]> {
        return this.em.find(Product, {});
    }

    async findById(id: string): Promise<Product> {
        return this.em.findOne(Product, { id });
    }
}
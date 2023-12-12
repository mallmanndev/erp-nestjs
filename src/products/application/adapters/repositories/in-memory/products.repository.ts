import { Product } from "@products/domain/entities/product";
import { IProductsRepository } from "@products/domain/ports/products-repository.contract";

export class InMemoryProductsRepository implements IProductsRepository {
    private products = [];

    async create(product: Product) {
        this.products.push(product);
    }

    async findByBarcode(barcode: string) {
        return this.products.find(product => product.barcode === barcode);
    }

    async findBySku(sku: string) {
        return this.products.find(product => product.sku === sku);
    }

    async findById(id: string) {
        return this.products.find(product => product.id === id);
    }

    async findAll() {
        return this.products;
    }

    async update(product: Product) {
        const productIndex = this.products.findIndex(p => p.id === product.id);
        this.products[productIndex] = product;
    }

    async delete(id: string) {
        const productIndex = this.products.findIndex(p => p.id === id);
        this.products.splice(productIndex, 1);
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { IProductsRepository } from "src/products/domain/ports/products-repository.contract";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "src/products/domain/entities/product";
import { Price } from "src/products/domain/entities/price";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductCreatedEvent } from "../events/product-created.event";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class CreateProductUseCase {

    constructor(
        @Inject("IProductsRepository")
        private readonly productRepository: IProductsRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly em: EntityManager,
    ) { }

    async execute(data: CreateProductDto) {
        const findProductByBarcode = await this.productRepository.findByBarcode(data.barcode);
        if (findProductByBarcode) {
            throw new Error('Produto com código de barras já existe');
        }

        const findProductBySku = await this.productRepository.findBySku(data.sku);
        if (findProductBySku) {
            throw new Error('Produto com SKU já existe');
        }

        const price = Price.create(data.price, data.coastPrice, "BRL");
        const product = Product.create(
            data.barcode,
            data.sku,
            data.name,
            data.description,
            price,
        )
        await this.productRepository.create(product);

        const productCreatedEvent = new ProductCreatedEvent(
            product.id,
            product.barcode,
            product.sku,
            product.name,
            product.description,
            product.price,
            product.createdAt,
        );
        this.eventEmitter.emit('product.created', productCreatedEvent);

        await this.em.flush();
        return product;
    }
}
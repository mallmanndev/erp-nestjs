import { IProductsRepository } from "@/products/domain/ports/products-repository.contract";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { Product } from "@products/domain/entities/product";
import { ProductAlteredEvent } from "../events/product-altered.event";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('IProductsRepository')
        private readonly productRepository: IProductsRepository,
        private readonly eventEmmiter: EventEmitter2,
    ) { }

    async execute(data: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.findById(data.id);
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        product.update(data);
        await this.productRepository.update(product);

        const event = new ProductAlteredEvent(
            product.id,
            product.name,
            product.description,
            product.gender,
            product.model,
            product.material,
            product.brand,
            product.weight,
            product.size,
            product.color,
        )
        this.eventEmmiter.emit(event.event, event);

        return product
    }
}
import { IProductsRepository } from "@products/domain/ports/products-repository.contract";
import { UpdateProductUseCase } from "./update-product.use-case";
import { InMemoryProductsRepository } from "../adapters/repositories/in-memory/products.repository";
import { Product } from "@products/domain/entities/product";
import { UpdateProductDto } from "../dtos/update-product.dto";

describe("UpdateProductUseCase", () => {
    let productsRepository: IProductsRepository
    let updateProductUseCase: UpdateProductUseCase;
    let eventEmmiter: any = {emit: jest.fn()}

    beforeEach(() => {
        productsRepository = new InMemoryProductsRepository()
        const product = new Product({
            id: '123',
            sku: '123456789',
            name: 'Camiseta',
            description: 'Camiseta branca',
        })
        productsRepository.create(product);
        updateProductUseCase = new UpdateProductUseCase(productsRepository, eventEmmiter);
    });

    it("Shoult throw error when product not exists", () => {
        const data = new UpdateProductDto({
            id: '123456',
            name: 'Camiseta alterada',
            description: 'Camiseta branca alterada',
        })

        expect(updateProductUseCase.execute(data)).rejects.toThrow('Produto não encontrado');
    })

    it("Should update product successfully", async () => {
        const data = new UpdateProductDto({
            id: '123',
            name: 'Camiseta alterada',
            description: 'Camiseta branca alterada',
        })

        const output = await updateProductUseCase.execute(data);

        expect(output.id).toBe('123');
        expect(output.name).toBe('Camiseta alterada');
        expect(output.description).toBe('Camiseta branca alterada');

        const findedProduct = await productsRepository.findById('123');
        expect(findedProduct.id).toBe("123")
        expect(findedProduct.sku).toBe("123456789")
        expect(findedProduct.name).toBe("Camiseta alterada")
        expect(findedProduct.description).toBe("Camiseta branca alterada")
    })
})
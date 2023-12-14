import { Product } from "../../domain/entities/product";
import { CreateProductUseCase } from "./create-product.use-case";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateProductDto } from "../dtos/create-product.dto";
import { InMemoryProductsRepository } from "../adapters/repositories/in-memory/products.repository";

describe('CreateProductUseCase', () => {
    let productRepository: InMemoryProductsRepository;
    let eventEmitter: EventEmitter2;
    let createProductUseCase: CreateProductUseCase;

    beforeEach(() => {
        productRepository = new InMemoryProductsRepository()
        const product = new Product({
            id: "1",
            barcode: "123456789",
            sku: "",
            name: "Product Name",
            description: "Product Description",
        })
        productRepository.create(product)
        const product2 = new Product({
            id: "2",
            barcode: "",
            sku: "123456789",
            name: "Product Name",
            description: "Product Description",
        })
        productRepository.create(product2)
        eventEmitter = new EventEmitter2();
        createProductUseCase = new CreateProductUseCase(productRepository, eventEmitter);
    })


    it("Should return error when product with barcode already exists", async () => {
        // Arrange
        const data = new CreateProductDto({
            barcode: "123456789",
            sku: "123456789",
            name: "Product Name",
            description: "Product Description",
            coastPrice: 10,
            price: 20,
            stock: 10,
        })

        // Assert
        return expect(createProductUseCase.execute(data)).rejects.toThrow("Produto com código de barras já existe")
    })

    it("Should return error when product with sku already exists", async () => {
        // Arrange
        const data = new CreateProductDto({
            sku: "123456789",
            name: "Product Name",
            description: "Product Description",
            coastPrice: 10,
            price: 20,
            stock: 10,
        })

        // Assert
        return expect(createProductUseCase.execute(data)).rejects.toThrow("Produto com SKU já existe")
    })

    it("Should not validate barcode when barcode is empty", async () => {
        // Arrange
        const emitSpy = jest.spyOn(eventEmitter, "emit")

        const data = new CreateProductDto({
            barcode: "",
            sku: "987654321",
            name: "Product Name",
            description: "Product Description",
            coastPrice: 10,
            price: 20,
            stock: 10,
        })

        // Act
        const product = await createProductUseCase.execute(data)

        // Assert
        expect(product).toBeInstanceOf(Product)
        expect(emitSpy).toHaveBeenCalledTimes(1)
        expect(emitSpy).toHaveBeenCalledWith("product.created", expect.anything())
    })

    it("Should return product when product is created", async () => {
        // Arrange
        const emitSpy = jest.spyOn(eventEmitter, "emit")

        const data = new CreateProductDto({
            barcode: "987654321",
            sku: "987654321",
            name: "Product Name",
            description: "Product Description",
            coastPrice: 10,
            price: 20,
            stock: 10,
        })

        // Act
        const product = await createProductUseCase.execute(data)

        // Assert
        expect(product).toBeInstanceOf(Product)
        expect(emitSpy).toHaveBeenCalledTimes(1)
        expect(emitSpy).toHaveBeenCalledWith("product.created", expect.anything())
    })
})
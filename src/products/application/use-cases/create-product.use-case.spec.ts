import { Product } from "../../domain/entities/product";
import { CreateProductUseCase } from "./create-product.use-case";
import { ProductsRepository } from "../adapters/repositories/products.repository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateProductDto } from "../dtos/create-product.dto";

describe('CreateProductUseCase', () => {
    let productRepository: ProductsRepository;
    let eventEmitter: EventEmitter2;
    let createProductUseCase: CreateProductUseCase;

    beforeEach(() => {
        productRepository = new ProductsRepository(null);
        eventEmitter = new EventEmitter2();
        createProductUseCase = new CreateProductUseCase(productRepository, eventEmitter);
    })


    it("Should return error when product with barcode already exists", async () => {
        // Arrange
        jest.spyOn(productRepository, "findByBarcode").mockResolvedValue(new Product({}))

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
        jest.spyOn(productRepository, "findByBarcode").mockResolvedValue(null)
        jest.spyOn(productRepository, "findBySku").mockResolvedValue(new Product({}))

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
        return expect(createProductUseCase.execute(data)).rejects.toThrow("Produto com SKU já existe")
    })

    it("Should not validate barcode when barcode is empty", async () => {
        // Arrange
        const barcodeSpy = jest.spyOn(productRepository, "findByBarcode")
        const skuSpy = jest.spyOn(productRepository, "findBySku").mockResolvedValue(null)
        const createFn = jest.spyOn(productRepository, "create").mockResolvedValue(null)
        const emitSpy = jest.spyOn(eventEmitter, "emit")

        const data = new CreateProductDto({
            barcode: "",
            sku: "123456789",
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
        expect(barcodeSpy).not.toHaveBeenCalled()
        expect(skuSpy).toHaveBeenCalledTimes(1)
        expect(createFn).toHaveBeenCalledTimes(1)
        expect(createFn).toHaveBeenCalledWith(product)
        expect(emitSpy).toHaveBeenCalledTimes(1)
        expect(emitSpy).toHaveBeenCalledWith("product.created", expect.anything())
    })

    it("Should not validate sku when sku is empty", async () => {
        // Arrange
        const barcodeSpy = jest.spyOn(productRepository, "findByBarcode").mockResolvedValue(null)
        const skuSpy = jest.spyOn(productRepository, "findBySku")
        const createFn = jest.spyOn(productRepository, "create").mockResolvedValue(null)
        const emitSpy = jest.spyOn(eventEmitter, "emit")

        const data = new CreateProductDto({
            barcode: "123456789",
            sku: "",
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
        expect(barcodeSpy).toHaveBeenCalledTimes(1)
        expect(skuSpy).not.toHaveBeenCalled()
        expect(createFn).toHaveBeenCalledTimes(1)
        expect(createFn).toHaveBeenCalledWith(product)
        expect(emitSpy).toHaveBeenCalledTimes(1)
        expect(emitSpy).toHaveBeenCalledWith("product.created", expect.anything())
    })

    it("Should return product when product is created", async () => {
        // Arrange
        jest.spyOn(productRepository, "findByBarcode").mockResolvedValue(null)
        jest.spyOn(productRepository, "findBySku").mockResolvedValue(null)
        const createFn = jest.spyOn(productRepository, "create").mockResolvedValue(null)
        const emitSpy = jest.spyOn(eventEmitter, "emit")

        const data = new CreateProductDto({
            barcode: "123456789",
            sku: "123456789",
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
        expect(createFn).toHaveBeenCalledTimes(1)
        expect(createFn).toHaveBeenCalledWith(product)
        expect(emitSpy).toHaveBeenCalledTimes(1)
        expect(emitSpy).toHaveBeenCalledWith("product.created", expect.anything())
    })
})
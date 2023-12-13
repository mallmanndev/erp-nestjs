import { IProductsRepository } from "@products/domain/ports/products-repository.contract"
import { DeleteProductUseCase } from "./delete-product.use-case"
import { InMemoryProductsRepository } from "../adapters/repositories/in-memory/products.repository"
import { IStockFacade } from "@stock/domain/ports/stock.facade"
import { Product } from "@products/domain/entities/product"


describe("Test deleteProduct", () => {
    let productsRepository: IProductsRepository
    let stockFacade: IStockFacade
    let sut: DeleteProductUseCase

    beforeAll(() => {
        productsRepository = new InMemoryProductsRepository()
        const product = new Product({
            id: '123',
            sku: '123456789',
            name: 'Camiseta',
            description: 'Camiseta branca',
        })
        productsRepository.create(product);
        stockFacade = { getStockByProductId: jest.fn() }
        sut = new DeleteProductUseCase(productsRepository, stockFacade)
    })


    it("Should returns error when product not exists", () => {
        return expect(sut.execute("1")).rejects.toThrow("Produto não encontrado")
    })

    it("Should returns error when product has stock", () => {
        stockFacade.getStockByProductId = jest.fn().mockResolvedValue({ quantity: 1 })

        return expect(sut.execute("123")).rejects.toThrow("Produto possui estoque")
    })

    it("Should returns product deleted", async () => {
        stockFacade.getStockByProductId = jest.fn().mockResolvedValue({ quantity: 0 })

        const del = await sut.execute("123")

        expect(del).toBe(true)
    })
})
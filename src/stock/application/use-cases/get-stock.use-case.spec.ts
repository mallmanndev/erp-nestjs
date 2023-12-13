import { Stock } from "@stock/domain/entities/stock"
import { StocksRepository } from "../adapters/repositories/in-memory/stocks.repository"
import { GetStockUseCase } from "./get-stock.use-case"

describe('GetStockUseCase', () => {
    let stock: Stock
    let stocksRepository: StocksRepository
    let sut: GetStockUseCase

    beforeEach(() => {
        jest.clearAllMocks()
        stocksRepository = new StocksRepository()
        stock = Stock.create("123", "Test", "UN", 10)
        stocksRepository.create(stock)
        sut = new GetStockUseCase(stocksRepository)
    })

    it('should throw error when stock not found', async () => {
        return expect(sut.execute("321")).rejects.toThrow("Estoque não existe.")
    })

    it('should get stock by product id', async () => {
        const output = await sut.execute("123")

        expect(output).toBeInstanceOf(Stock)
        expect(output.productId).toBe("123")
        expect(output.productName).toBe("Test")
    })

})
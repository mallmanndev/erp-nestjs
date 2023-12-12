import { Stock } from "@stock/domain/entities/stock"
import { StocksRepository } from "../adapters/repositories/in-memory/stocks.repository"
import { InputStockDTO } from "../dtos/input-stock.dto"
import { InputStockUseCase } from "./input-stock.use-case"

describe("Test InputStockUseCase", () => {
    let stock: Stock
    let stocksRepository: StocksRepository
    let eventEmitter: any
    let sut: InputStockUseCase

    beforeEach(() => {
        jest.clearAllMocks()
        stocksRepository = new StocksRepository()
        stock = Stock.create("123", "Test", "UN", 10)
        stocksRepository.create(stock)
        eventEmitter = { emit: jest.fn() }
        sut = new InputStockUseCase(stocksRepository, eventEmitter)
    })

    it("Should returns error when stock not exists", async () => {
        const data = new InputStockDTO({
            productId: "321",
            quantity: 10,
        })

        expect(sut.execute(data)).rejects.toThrow("Estoque não existe.")
    })

    it("Should returns error when quantity is negative", () => {
        const data = new InputStockDTO({
            productId: "123",
            quantity: -10,
        })

        return expect(sut.execute(data)).rejects.toThrow("Quantidade inválida.")
    })

    it("Should input stock", async () => {
        const data = new InputStockDTO({
            productId: "123",
            quantity: 10,
        })

        const output = await sut.execute(data)
        const stock = await stocksRepository.findByProductId("123")

        expect(output.stockId).toBe(stock.id)
        expect(output.quantity).toBe(20)

        expect(stock.quantity).toBe(20)
        expect(stock.movements.length).toBe(2)
        expect(stock.movements[1].quantity).toBe(10)

        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })
})
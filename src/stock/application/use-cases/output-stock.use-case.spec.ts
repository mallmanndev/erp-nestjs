import { Stock } from "@stock/domain/entities/stock"
import { StocksRepository } from "../adapters/repositories/in-memory/stocks.repository"
import { OutputStockUseCase } from "./output-stock.use-case"
import { OutputStockInputDTO } from "../dtos/output-stock.dto"


describe("Test OutputStockUseCase", () => {
    let stock: Stock
    let stocksRepository: StocksRepository
    let eventEmitter: any
    let sut: OutputStockUseCase

    beforeEach(() => {
        jest.clearAllMocks()
        stocksRepository = new StocksRepository()
        stock = Stock.create("123", "Test", "UN", 10)
        stocksRepository.create(stock)
        eventEmitter = { emit: jest.fn() }
        sut = new OutputStockUseCase(stocksRepository, eventEmitter)
    })

    it("Should returns error when stock not exists", () => {
        const data = new OutputStockInputDTO({
            productId: "321",
            quantity: 10,
        })

        return expect(sut.execute(data)).rejects.toThrow("Estoque não existe.")
    })

    it("Should returns error when quantity is negative", () => {
        const data = new OutputStockInputDTO({
            productId: "123",
            quantity: -10,
        })

        return expect(sut.execute(data)).rejects.toThrow("Quantidade inválida.")
    })

    it("Should returns error when quantity is greater than stock quantity", () => {
        const data = new OutputStockInputDTO({
            productId: "123",
            quantity: 20,
        })

        return expect(sut.execute(data)).rejects.toThrow("Estoque insuficiente.")
    })

    it("Should output stock", async () => {
        const data = new OutputStockInputDTO({
            productId: "123",
            quantity: 5,
        })

        const output = await sut.execute(data)
        const stock = await stocksRepository.findByProductId("123")

        expect(output.stockId).toBe(stock.id)
        expect(output.quantity).toBe(5)

        expect(stock.quantity).toBe(5)
        expect(stock.movements.length).toBe(2)
        expect(stock.movements[1].type).toBe("output")
        expect(stock.movements[1].quantity).toBe(5)

        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
        expect(eventEmitter.emit).toHaveBeenCalledWith("stock.outputed", {
            id: expect.any(String),
            date: expect.any(Date),
            event: "stock.outputed",
            version: 1,
            stockId: stock.id,
            quantity: 5,
            productId: stock.productId,
            productName: stock.productName,
            quantityType: stock.quantityType,
        })
    })

})
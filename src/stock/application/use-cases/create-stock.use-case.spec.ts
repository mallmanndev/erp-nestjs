import { Stock } from "@stock/domain/entities/stock";
import { CreateStockDTO } from "../dtos/create-stock.dto";
import { StocksRepository } from "../repositories/in-memory/stocks.repository";
import { CreateStockUseCase } from "./create-stock.use-case";

describe("Create Stock", () => {
    let stocksRepository: StocksRepository
    let sut: CreateStockUseCase;
    let eventEmitter: any;

    beforeEach(() => {
        jest.clearAllMocks();
        stocksRepository = new StocksRepository();
        eventEmitter = { emit: jest.fn() }
        sut = new CreateStockUseCase(stocksRepository, eventEmitter);
    })

    it("Should throw error if stock already exists", () => {
        const stock = Stock.create("123", "Test", "UN", 10)
        stocksRepository.create(stock)

        const data = new CreateStockDTO({
            productId: "123",
            productName: "Test",
            quantityType: "UN",
            quantity: 10,
        })

        expect(sut.execute(data)).rejects.toThrow("Estoque já existe.");
    })

    it("Should create stock", async () => {
        const data = new CreateStockDTO({
            productId: "123",
            productName: "Test",
            quantityType: "UN",
            quantity: 10,
        })

        await sut.execute(data)

        const stock = await stocksRepository.findByProductId("123")
        expect(stock.productId).toBe("123")
        expect(stock.productName).toBe("Test")
        expect(stock.quantityType).toBe("UN")
        expect(stock.quantity).toBe(10)
    })
})
import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma.service";
import { StockFacade } from "@/stock/application/facade/stock.facade";
import { Stock } from "@/stock/domain/entities/stock";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("Test StockFacade", () => {
    let app: INestApplication;
    let prisma: PrismaService
    let stockFacade: StockFacade

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleFixture.get<PrismaService>(PrismaService);
        stockFacade = moduleFixture.get<StockFacade>('IStockFacade');
        app = moduleFixture.createNestApplication();
        await app.init();

        await prisma.event.deleteMany()
        await prisma.stockMovement.deleteMany()
        await prisma.stock.deleteMany()
        await prisma.price.deleteMany()
        await prisma.product.deleteMany()

        await prisma.product.create({
            data: {
                id: "1",
                name: "Teste",
                description: "Teste",
                createdAt: new Date(),
            }
        })
        await prisma.stock.create({
            data: {
                id: "1",
                createdAt: new Date(),
                productId: "1",
                productName: "Teste",
                quantityType: "UN",
                quantity: 2,
                movements: {
                    create: {
                        id: "1",
                        date: new Date(),
                        type: "INPUT",
                        quantity: 2,
                    }
                }
            }
        })
    })

    afterAll(async () => {
        await app.close();
    });


    describe("Test getStockByProductId", () => {
        it("Should returns error when stock not exists", () => {
            return expect(stockFacade.getStockByProductId("2")).rejects.toThrow("Estoque não existe.")
        })

        it("Should returns stock quantity", async () => {
            const stock = await stockFacade.getStockByProductId("1")

            expect(stock).toBeInstanceOf(Stock)
            expect(stock.productId).toBe("1")
            expect(stock.quantity).toBe(2)
        })
    })

})
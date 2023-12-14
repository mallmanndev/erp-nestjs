import { AppModule } from "@/app.module";
import { PrismaService } from "@prisma_module/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { JwtService } from "@nestjs/jwt";


describe("Output stock", () => {
    let app: INestApplication;
    let prisma: PrismaService
    let jwtService: JwtService;
    let token: string

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleFixture.get<PrismaService>(PrismaService);
        jwtService = moduleFixture.get<JwtService>(JwtService);

        token = await jwtService.signAsync({ sub: "123", email: "email@email.com", tenant: "default" })

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await prisma.event.deleteMany()
        await prisma.stockMovement.deleteMany()
        await prisma.stock.deleteMany()
        await prisma.price.deleteMany()
        await prisma.product.deleteMany()

        await prisma.product.create({
            data: {
                id: "1",
                tenantId: "default",
                name: "Teste",
                description: "Teste",
                createdAt: new Date(),
            }
        })
        await prisma.stock.create({
            data: {
                id: "1",
                tenantId: "default",
                createdAt: new Date(),
                productId: "1",
                productName: "Teste",
                quantityType: "UN",
                quantity: 2,
                movements: {
                    create: {
                        id: "1",
                        tenantId: "default",
                        date: new Date(),
                        type: "INPUT",
                        quantity: 2,
                    }
                }
            }

        })
    })

    it("Should returns error when stock does not exists", () => {
        const mutation = `
            mutation {
                outputStock(
                    data: {
                        productId: "gdsfdsf",
                        quantity: 2
                    }
                ) {
                    stockId
                    productId
                    productName
                    quantityType
                    quantity
                }
            }
        `

        return request(app.getHttpServer())
            .post('/graphql')
            .set("Authorization", `Bearer ${token}`)
            .send({ query: mutation })
            .expect(({ body }) => {
                expect(body.errors[0].message).toBe("Estoque não existe.")
            })
    })

    it("Should returns error when stock is lower than quantity", () => {
        const mutation = `
            mutation {
                outputStock(
                    data: {
                        productId: "1",
                        quantity: 10
                    }
                ) {
                    stockId
                    productId
                    productName
                    quantityType
                    quantity
                }
            }
        `

        return request(app.getHttpServer())
            .post('/graphql')
            .set("Authorization", `Bearer ${token}`)
            .send({ query: mutation })
            .expect(({ body }) => {
                expect(body.errors[0].message).toBe("Estoque insuficiente.")
            })
    })

    it("Should input stock successfully", async () => {
        const mutation = `
            mutation {
                outputStock(
                    data: {
                        productId: "1",
                        quantity: 2
                    }
                ) {
                    stockId
                    productId
                    productName
                    quantityType
                    quantity
                }
            }
        `

        const { body } = await request(app.getHttpServer())
            .post('/graphql')
            .set("Authorization", `Bearer ${token}`)
            .send({ query: mutation })

        expect(body.data.outputStock.stockId).toBe("1")
        expect(body.data.outputStock.productId).toBe("1")
        expect(body.data.outputStock.productName).toBe("Teste")
        expect(body.data.outputStock.quantityType).toBe("UN")

        const stock = await prisma.stock.findUnique({ where: { id: "1" }, include: { movements: true } })

        expect(stock.quantity).toBe(0)
        expect(stock.movements.length).toBe(2)
        expect(stock.movements[1].quantity).toBe(2)

        const event = await prisma.event.findFirst({ where: { event: "stock.outputed" } })

        expect(event).toMatchObject({
            id: expect.anything(),
            event: "stock.outputed",
            date: expect.any(Date),
            version: 1,
            payload: expect.any(String)
        })
    })
})
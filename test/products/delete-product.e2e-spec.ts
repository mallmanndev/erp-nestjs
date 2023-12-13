import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';

describe("Test deleteProduct mutation", () => {
    let app: INestApplication;
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleFixture.get<PrismaService>(PrismaService);

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
                id: "123",
                name: "Teste",
                description: "Teste",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        await prisma.stock.create({
            data: {
                id: "1",
                createdAt: new Date(),
                productId: "123",
                productName: "Teste",
                quantityType: "UN",
                quantity: 2,
            }
        })

        await prisma.product.create({
            data: {
                id: "123456",
                name: "Teste",
                description: "Teste",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        await prisma.stock.create({
            data: {
                id: "2",
                createdAt: new Date(),
                productId: "123456",
                productName: "Teste",
                quantityType: "UN",
                quantity: 0,
            }
        })
    })

    it("Should return error when product is not found", async () => {
        const mutation = `
            mutation {
                deleteProduct(id: "321")
            }
        `

        const { body } = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(body.errors[0].message).toBe("Produto não encontrado")
    })

    it("Should return error when product has stock", async () => {
        const mutation = `
            mutation {
                deleteProduct(id: "123")
            }
        `

        const { body } = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(body.errors[0].message).toBe("Produto possui estoque")
    })

    it("Should delete product successfully", async () => {
        const mutation = `
            mutation {
                deleteProduct(id: "123456")
            }
        `

        const { body } = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(body.data.deleteProduct).toBeTruthy()

        const findProduct = await prisma.product.findFirst({ where: { id: "123456" } })
        expect(findProduct.deletedAt).not.toBeNull()
    })
})
import { AppModule } from "@/app.module";
import { PrismaService } from "@prisma_module/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { JwtService } from "@nestjs/jwt";

describe("Update Product", () => {
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
                id: "123",
                tenantId: "default",
                name: "Teste",
                description: "Teste",
                createdAt: new Date(),
            }
        })
    })

    it("Should return error when product is not found", async () => {
        const mutation = `
            mutation {
                updateProduct(
                    data: {
                        id: "1"
                        name: "Teste"
                        description: "Teste"
                    }
                ) {
                    id
                    name
                    description
                }
            }
        `

        const { body } = await request(app.getHttpServer())
            .post("/graphql")
            .set("Authorization", `Bearer ${token}`)
            .send({ query: mutation })

        expect(body.errors[0].message).toBe("Produto não encontrado")
    })

    it("Should update product successfully", async () => {
        const mutation = `
            mutation {
                updateProduct(
                    data: {
                        id: "123"
                        name: "Teste altered"
                        description: "Teste altered"
                    }
                ) {
                    id
                    name
                    description
                }
            }
        `
        const { body } = await request(app.getHttpServer())
            .post("/graphql")
            .set("Authorization", `Bearer ${token}`)
            .send({ query: mutation })

        expect(body.data.updateProduct.name).toBe("Teste altered")
        expect(body.data.updateProduct.description).toBe("Teste altered")


        const findProduct = await prisma.product.findFirst({ where: { id: "123" } })
        expect(findProduct.id).toBe("123")
        expect(findProduct.name).toBe("Teste altered")
        expect(findProduct.description).toBe("Teste altered")

        const findEvent = await prisma.event.findFirst({ where: { event: "product.altered" } })
        expect(findEvent).toBeTruthy()
    })
})
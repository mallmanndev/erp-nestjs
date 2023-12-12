import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma.service";

describe("Create Product", () => {
    jest.setTimeout(10000);
    let app: INestApplication;
    let prisma: PrismaService

    beforeEach(async () => {
        await prisma.event.deleteMany()
        await prisma.stockMovement.deleteMany()
        await prisma.stock.deleteMany()
        await prisma.price.deleteMany()
        await prisma.product.deleteMany()
    })

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

    it("should create a product", async () => {
        const mutation = `
        mutation {
            createProduct(
                data: {
                    barcode: "",
                    sku: "",
                    name: "Teste",
                    description: "Teste",
                    price: 12,
                    coastPrice: 6,
                    stock: 2,
                    brand: "Brand",
                    gender: "M",
                    model: "Model",
                    material: "Material",
                    size: "P",
                    weight: 100,
                    color: "Color",
                    quantityType: "UN",
                    quantity: 2,
                }
            ) {
                id
                name
                description
                createdAt
            }
        }
        `

        const response = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation.toString() })

        expect(response.status).toBe(200)
        expect(response.body.data.createProduct).toMatchObject({
            "id": expect.any(String),
            "name": "Teste",
            "description": "Teste",
            "createdAt": expect.any(String),
        })
    })
})
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "@/app.module";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql"

describe("Create Product", () => {
    jest.setTimeout(10000);
    let app: INestApplication;
    let postgresContainer: StartedPostgreSqlContainer;

    beforeEach(async () => {
        postgresContainer = await new PostgreSqlContainer().start();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close();
        await postgresContainer.stop();
    });

    it("should create a product", () => {
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
                }
            ) {
                id
                name
                description
                createdAt
            }
        }
        `

        return request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation.toString() }).then(response => {
                expect(response.status).toBe(200)
                expect(response.body.data.createProduct).toMatchObject({
                    "id": expect.any(String),
                    "name": "Teste",
                    "description": "Teste",
                    "createdAt": expect.any(String),
                })
            })
    })
})

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";
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
    return request(app.getHttpServer())
      .post("/products")
      .send({
        "name": "Teste",
        "description": "Teste",
        "price": 12,
        "stock": 1,
        "image": "fdsfsdf"
      }).then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({
          "id": expect.any(String),
          "name": "Teste",
          "description": "Teste",
          "createdAt": expect.any(String),
        })
      })
  })
})

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "../../src/app.module";

describe("Create Product", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  afterAll(async () => {
    await app.close();
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
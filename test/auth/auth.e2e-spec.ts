import { AppModule } from "@/app.module";
import { PrismaService } from "@prisma_module/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import * as bcrypt from 'bcrypt'

describe("Test Login", () => {
    let app: INestApplication;
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        prisma = moduleFixture.get<PrismaService>(PrismaService);
        app = moduleFixture.createNestApplication();
        await app.init();

        await prisma.user.deleteMany()
        await prisma.user.create({
            data: {
                id: "123",
                tentanId: "default",
                firstName: "Test",
                lastName: "Test",
                email: "email@email.com",
                password: "$2b$16$w3w0NHyYKLESrjUeqzPWp.JU3hrZSVrbxeSnT5NUfjcVC6tbiI7DO",
                createdAt: new Date(),
            },
        })
    })

    afterAll(async () => {
        await app.close();
    });

    it("Should throw an error when email is invalid", async () => {
        const mutation = `
            mutation {
                login(data: {
                    email: "email_test",
                    password: "987654321"
                }) {
                    token
                }
            }
        `
        const response = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(response.body.errors[0].message).toBe("Email inválido")
    })

    it("Should throw an error when password is invalid", async () => {
        const mutation = `
            mutation {
                login(data: {
                    email: "email@email.com",
                    password: "987654321"
                }) {
                    token
                }
            }
        `
        const response = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(response.body.errors[0].message).toBe("Senha inválida")
    })

    it("Should throw an error when password is invalid", async () => {
        const mutation = `
            mutation {
                login(data: {
                    email: "email@email.com",
                    password: "12345678"
                }) {
                    token
                }
            }
        `
        const response = await request(app.getHttpServer())
            .post("/graphql")
            .send({ query: mutation })

        expect(response.body.data.login).not.toBeNull()
    })
})
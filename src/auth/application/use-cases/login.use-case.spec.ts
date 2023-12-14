import { User } from "@/auth/domain/enitites/user"
import { InMemoryUsersRepository } from "../adapters/repositories/in-memory/users.repository"
import { LoginInputDTO } from "../dtos/login.dto"
import { LoginUseCase } from "./login.use-case"

describe("Test Login use case", () => {
    let jwtServiceMock: any
    let loginUseCase: LoginUseCase

    beforeAll(() => {
        const repository = new InMemoryUsersRepository()
        const user = new User({
            id: "1",
            firstName: "test",
            lastName: "test",
            email: "fulano@email.com",
            tenant: "default",
        })
        user.setPassword("12345678")
        repository.create(user)
        jwtServiceMock = {
            sign: jest.fn().mockReturnValue("token_test")
        }
        loginUseCase = new LoginUseCase(repository, jwtServiceMock)
    })


    it("Should throw an error when email is invalid", () => {
        const input = new LoginInputDTO({
            email: "email_test@email.com",
            password: "password_test"
        })

        return expect(loginUseCase.execute(input)).rejects.toThrow("Email inválido")
    })

    it("Should throw an error when password is invalid", () => {
        const input = new LoginInputDTO({
            email: "fulano@email.com",
            password: "987654321"
        })

        return expect(loginUseCase.execute(input)).rejects.toThrow("Senha inválida")
    })

    it("Should throw an error when password is invalid", async () => {
        const input = new LoginInputDTO({
            email: "fulano@email.com",
            password: "12345678"
        })

        const output = await loginUseCase.execute(input)

        expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1)
        expect(jwtServiceMock.sign).toHaveBeenCalledWith({
            sub: "1",
            email: "fulano@email.com",
            tenant: "default"
        })

        expect(output.token).toBe("token_test")
    })
})
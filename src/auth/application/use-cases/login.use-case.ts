import { IUsersRepository } from "@auth/domain/ports/users.repository";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/login.dto";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject("IUsersRepository")
        private readonly usersRepository: IUsersRepository,
        private jwtService: JwtService,
    ) { }

    async execute(data: LoginInputDTO): Promise<LoginOutputDTO> {
        const user = await this.usersRepository.findByEmail(data.email)
        if (!user) throw new Error("Email inválido")

        const isValid = await user.validatePassword(data.password)
        if (!isValid) throw new Error("Senha inválida")

        const payload = { sub: user.id, email: user.email, tenant: user.tenant };
        const token = this.jwtService.sign(payload);

        return new LoginOutputDTO({ token })
    }
}
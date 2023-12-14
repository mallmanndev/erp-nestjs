import { User } from "@/auth/domain/enitites/user";
import { PrismaService } from "@prisma_module/prisma.service";
import { IUsersRepository } from "@auth/domain/ports/users.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository implements IUsersRepository {

    constructor(private readonly prisma: PrismaService) { }

    create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User> {
        const find = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!find) return null

        return new User({
            id: find.id,
            firstName: find.firstName,
            lastName: find.lastName,
            email: find.email,
            password: find.password,
            tenant: find.tentanId,
        })
    }
}
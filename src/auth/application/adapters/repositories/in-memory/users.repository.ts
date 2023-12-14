import { User } from "@auth/domain/enitites/user";
import { IUsersRepository } from "@auth/domain/ports/users.repository";

export class InMemoryUsersRepository implements IUsersRepository {
    public users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }
}
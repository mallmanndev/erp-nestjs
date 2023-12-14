import { User } from "../enitites/user";

export interface IUsersRepository {
    create(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
}
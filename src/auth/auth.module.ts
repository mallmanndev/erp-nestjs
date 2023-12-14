import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGraphqlGuard } from './auth-graphql.guard';
import { AuthResolver } from './application/adapters/graphql/auth.resolver';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UsersRepository } from './application/adapters/repositories/users.repository';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [
        LoginUseCase,
        AuthGraphqlGuard,
        AuthResolver,
        { provide: "IUsersRepository", useClass: UsersRepository },
    ],
    exports: [AuthGraphqlGuard]
})
export class AuthModule { }
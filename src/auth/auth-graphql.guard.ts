import { TenantService } from "@tenant/tenant.service";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGraphqlGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tenantService: TenantService,
    ) { }

    async canActivate(
        context: ExecutionContext
    ) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext()

        const token = this.extractTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException("Token inválido.");
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            this.tenantService.tenantId = payload.tenant;
        } catch {
            throw new UnauthorizedException("Token inválido.");
        }
        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
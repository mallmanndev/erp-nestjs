import { Injectable } from "@nestjs/common";
import { Event } from "../entities/event";
import { PrismaService } from "@prisma_module/prisma.service";
import { TenantService } from "@tenant/tenant.service";

@Injectable()
export class EventsRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tenantService: TenantService,
    ) { }

    async add(event: Event): Promise<void> {
        await this.prisma.event.create({
            data: {
                ...event,
                tenantId: this.tenantService.tenantId,
            }
        })
    }

    async getAll(): Promise<any[]> {
        const events = await this.prisma.event.findMany()
        return events
    }
}
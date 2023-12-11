import { Injectable } from "@nestjs/common";
import { Event } from "../entities/event";
import { PrismaService } from "@/prisma.service";

@Injectable()
export class EventsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async add(event: Event): Promise<void> {
        await this.prisma.event.create({ data: event })
    }
}
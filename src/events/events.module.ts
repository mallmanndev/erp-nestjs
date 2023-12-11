import { Module } from "@nestjs/common";
import { EventsRepository } from "./repositories/events.repository";
import { AllEventsListener } from "./listeners/all-events.listener";
import { PrismaService } from "@/prisma.service";

@Module({
    providers: [
        PrismaService,
        EventsRepository,
        AllEventsListener,
    ],
})
export class EventsModule { }
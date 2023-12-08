import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Event } from "./entities/event";
import { EventsRepository } from "./repositories/events.repository";
import { AllEventsListener } from "./listeners/all-events.listener";

@Module({
    imports: [MikroOrmModule.forFeature([Event])],
    providers: [
        EventsRepository,
        AllEventsListener,
    ],
})
export class EventsModule { }
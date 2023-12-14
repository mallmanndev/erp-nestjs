import { Module } from "@nestjs/common";
import { EventsRepository } from "./repositories/events.repository";
import { AllEventsListener } from "./listeners/all-events.listener";

@Module({
    providers: [
        EventsRepository,
        AllEventsListener,
    ],
})
export class EventsModule { }
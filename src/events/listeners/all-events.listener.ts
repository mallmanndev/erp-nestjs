import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from "../entities/event";

@Injectable()
export class AllEventsListener {
    constructor(private eventsRepository: EventsRepository) { }

    @OnEvent('**', {})
    async handleEverything(data: any) {
        const { event, date, version } = data;
        const eventEntity = new Event(data.id, event, date, version, JSON.stringify(data))
        this.eventsRepository.add(eventEntity);
    }
}
import { Injectable } from "@nestjs/common";
import { Event } from "../entities/event";
import { EntityManager } from "@mikro-orm/postgresql";

@Injectable()
export class EventsRepository {
    constructor(private em: EntityManager) { }

    async add(event: Event): Promise<void> {
        this.em.persist(event);
    }
}
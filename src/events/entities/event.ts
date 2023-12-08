import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "events" })
export class Event {
    @PrimaryKey()
    id: string

    @Property()
    event: string

    @Property()
    date: Date

    @Property()
    version: number

    @Property({ type: "json" })
    payload: string

    constructor(id: string, event: string, date: Date, version: number, payload: string) {
        this.id = id
        this.event = event
        this.date = date
        this.version = version
        this.payload = payload
    }
}
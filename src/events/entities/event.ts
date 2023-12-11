export class Event {
    id: string
    event: string
    date: Date
    version: number
    payload: string

    constructor(id: string, event: string, date: Date, version: number, payload: string) {
        this.id = id
        this.event = event
        this.date = date
        this.version = version
        this.payload = payload
    }
}
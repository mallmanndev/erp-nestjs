import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms));

@Injectable()
export class ProductCreatedListener {
    constructor() { }

    @OnEvent('product.created')
    async handle(data: any) {
        const { event, date, version } = data;
        console.log(`Event: ${event} - Date: ${date} - Version: ${version}`)
        await waitFor(2000);
        throw new Error('Error in ProductCreatedListener');
    }
}
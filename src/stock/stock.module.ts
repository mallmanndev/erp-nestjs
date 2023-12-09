import { Module } from "@nestjs/common";
import { ProductCreatedListener } from "./application/listeners/product-created.listener";

@Module({
    imports: [],
    providers: [ProductCreatedListener],
    exports: [],
})
export class StockModule { }
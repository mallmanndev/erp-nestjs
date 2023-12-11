import { PrismaService } from "@/prisma.service";
import { Stock } from "@/stock/domain/entities/stock";
import { StocksContract } from "@/stock/domain/ports/stocks.contract";
import { Injectable } from "@nestjs/common";
import { StockMovementType } from "@prisma/client";

@Injectable()
export class StocksRepository implements StocksContract {
    constructor(private readonly prisma: PrismaService) { }

    async create(stock: Stock): Promise<void> {
        await this.prisma.stock.create({
            data: {
                id: stock.id,
                productId: stock.productId,
                productName: stock.productName,
                quantityType: stock.quantityType,
                quantity: stock.quantity,
                createdAt: stock.createdAt,
                movements: {
                    create: stock.movements.map((movement) => ({
                        id: movement.id,
                        type: StockMovementType[movement.type.toUpperCase()],
                        quantity: movement.quantity,
                        date: movement.date,
                    })),
                }
            },
        })
    }

    update(stock: Stock): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(stock: Stock): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Stock> {
        throw new Error("Method not implemented.");
    }

    async findByProductId(productId: string): Promise<Stock> {
        const find = await this.prisma.stock.findUnique({
            where: { productId },
        });

        return find ? new Stock(find) : null
    }
}

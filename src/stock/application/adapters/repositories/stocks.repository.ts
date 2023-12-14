import { PrismaService } from "@prisma_module/prisma.service";
import { Stock } from "@/stock/domain/entities/stock";
import { StocksContract } from "@/stock/domain/ports/stocks.contract";
import { TenantService } from "@tenant/tenant.service";
import { Injectable } from "@nestjs/common";
import { StockMovementType } from "@prisma/client";

@Injectable()
export class StocksRepository implements StocksContract {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tenantService: TenantService,
    ) { }

    async create(stock: Stock): Promise<void> {
        await this.prisma.stock.create({
            data: {
                id: stock.id,
                productId: stock.productId,
                productName: stock.productName,
                quantityType: stock.quantityType,
                quantity: stock.quantity,
                createdAt: stock.createdAt,
                tenantId: this.tenantService.tenantId,
                movements: {
                    create: stock.movements.map((movement) => ({
                        id: movement.id,
                        type: StockMovementType[movement.type.toUpperCase()],
                        quantity: movement.quantity,
                        date: movement.date,
                        tenantId: this.tenantService.tenantId,
                    })),
                }
            },
        })
    }

    async update(stock: Stock): Promise<void> {
        await this.prisma.stock.update({
            data: {
                productName: stock.productName,
                quantityType: stock.quantityType,
                quantity: stock.quantity,
                updatedAt: stock.updatedAt,
                tenantId: this.tenantService.tenantId,
                movements: {
                    upsert: stock.movements.map((movement) => ({
                        where: { id: movement.id },
                        update: {
                            type: StockMovementType[movement.type.toUpperCase()],
                            quantity: movement.quantity,
                            date: movement.date,
                        },
                        create: {
                            id: movement.id,
                            type: StockMovementType[movement.type.toUpperCase()],
                            quantity: movement.quantity,
                            date: movement.date,
                            tenantId: this.tenantService.tenantId,
                        },
                    })),
                }
            },
            where: { id: stock.id }
        })
    }

    async findByProductId(productId: string): Promise<Stock> {
        const find = await this.prisma.stock.findUnique({
            where: { productId },
        });

        return find ? new Stock({ ...find, movements: [] }) : null
    }
}

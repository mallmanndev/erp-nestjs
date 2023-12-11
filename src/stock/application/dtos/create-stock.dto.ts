export class CreateStockDTO {
    productId: string;
    productName: string;
    quantityType: string;
    quantity: number;

    constructor(data: CreateStockDTO){
        this.productId = data.productId;
        this.productName = data.productName;
        this.quantityType = data.quantityType;
        this.quantity = data.quantity;
    }
}
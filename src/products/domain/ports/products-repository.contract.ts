import { Product } from "../entities/product";


export interface IProductsRepository {
    findById(id: string): Promise<Product>;
    findByBarcode(barcode: string): Promise<Product>;
    findBySku(sku: string): Promise<Product>;
    create(product: Product): Promise<void>;
    update(product: Product): Promise<void>;
}
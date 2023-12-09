import { ProductsRepository } from "./products.repository";
import { Product } from "../../../domain/entities/product";

describe("ProductsRepository", () => {
    let em;
    let productsRepository;
    let product

    beforeEach(async () => {
        em = {
            persist: jest.fn(),
            getReference: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn().mockReturnValue(product),
            find: jest.fn(),
        }
        productsRepository = new ProductsRepository(em);
        product = new Product({
            _id: "c45e48ea-675c-4c19-a4e1-ecef18f19712",
            _name: "Product 1",
            _description: "Product 1 description",
            _price: 10,
            _barcode: "123456789012",
            _sku: "123456789012",
        });
    });

    const assertProduct = (product, expected) => {
        expect(product.id).toBe(expected.id);
        expect(product.name).toBe(expected.name);
        expect(product.description).toBe(expected.description);
        expect(product.price).toBe(expected.price);
        expect(product.barcode).toBe(expected.barcode);
        expect(product.sku).toBe(expected.sku);
    }

    describe("create", () => {
        it("should persist the product", async () => {
            await productsRepository.create(product);
            expect(em.persist).toHaveBeenCalledWith(product);
        });
    });

    describe("update", () => {
        it("should persist the product", async () => {
            await productsRepository.update(product);
            expect(em.persist).toHaveBeenCalledWith(product);
        });
    });

    describe("delete", () => {
        it("should remove the product", async () => {
            const id = "c45e48ea-675c-4c19-a4e1-ecef18f19712";
            await productsRepository.delete(id);
            expect(em.getReference).toHaveBeenCalledWith(Product, id);
            expect(em.remove).toHaveBeenCalled();
        });
    });

    describe("findByBarcode", () => {
        it("should find the product by barcode", async () => {
            const barcode = "c45e48ea-675c-4c19-a4e1-ecef18f19712";
            const findProduct = await productsRepository.findByBarcode(barcode);
            expect(em.findOne).toHaveBeenCalledWith(Product, { barcode });
            assertProduct(findProduct, product);
        });
    });

    describe("findBySku", () => {
        it("should find the product by sku", async () => {
            const sku = "c45e48ea-675c-4c19-a4e1-ecef18f19712";
            const findProduct = await productsRepository.findBySku(sku);
            expect(em.findOne).toHaveBeenCalledWith(Product, { sku });
            assertProduct(findProduct, product);
        });
    });

    describe("findAll", () => {
        it("should find all products", async () => {
            await productsRepository.findAll();
            expect(em.find).toHaveBeenCalledWith(Product, {});
        });
    })

    describe("findById", () => {
        it("should find the product by id", async () => {
            const id = "c45e48ea-675c-4c19-a4e1-ecef18f19712";
            const findProduct = await productsRepository.findById(id);
            expect(em.findOne).toHaveBeenCalledWith(Product, { id });
            assertProduct(findProduct, product);
        });
    });

})
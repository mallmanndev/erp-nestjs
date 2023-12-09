import { Price } from "./price"
import { Product } from "./product"

describe("Product", () => {
    describe("create", () => {
        it("should create a product", () => {
            // Arrange
            const price = Price.create(10, 5, "BRL")
            const product = Product.create(
                "Product 1 barcode",
                "Product 1 sku",
                "Product 1",
                "Product 1 description",
                price,
            )

            // Assert
            expect(product).toBeInstanceOf(Product)
            expect(product.id).not.toBeNull()
            expect(product.barcode).toBe("Product 1 barcode")
            expect(product.sku).toBe("Product 1 sku")
            expect(product.name).toBe("Product 1")
            expect(product.description).toBe("Product 1 description")
            expect(product.price).toBeInstanceOf(Price)
            expect(product.createdAt).not.toBeNull()
        })

        it("should set barcode and sku null when is empty", () => {
            // Arrange
            const price = Price.create(10, 5, "BRL")
            const product = Product.create(
                "",
                "",
                "Product 1",
                "Product 1 description",
                price,
            )

            // Assert
            expect(product).toBeInstanceOf(Product)
            expect(product.id).not.toBeNull()
            expect(product.barcode).toBeNull()
            expect(product.sku).toBeNull()
        })
    })

})
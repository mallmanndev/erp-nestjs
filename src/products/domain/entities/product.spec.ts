import { AdditionalField } from "./additional-field"
import { Dimension } from "./dimension"
import { Price } from "./price"
import { Product } from "./product"

describe("Product", () => {
    describe("create", () => {
        it("should create a product", () => {
            // Arrange
            const product = Product.create({
                barcode: "Product 1 barcode",
                sku: "Product 1 sku",
                name: "Product 1",
                description: "Product 1 description",
                price: Price.create(10, 5, "BRL"),
                brand: "Brand 1",
                model: "Model 1",
                color: "Color 1",
                size: "M",
                weight: 100,
                material: "Material 1",
                gender: "Gender 1",
                additionalFields: [
                    AdditionalField.create("field 1", "value 1"),
                    AdditionalField.create("field 2", "value 2"),
                ],
            })

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
    })

    describe("update", () => {
        it("should update a product", () => {
            const product = Product.create({
                barcode: "Product 1 barcode",
                sku: "Product 1 sku",
                name: "Product 1",
                description: "Product 1 description",
                price: Price.create(10, 5, "BRL"),
                brand: "Brand 1",
                model: "Model 1",
                color: "Color 1",
                size: "M",
                weight: 100,
                material: "Material 1",
                gender: "Gender 1",
                additionalFields: [
                    AdditionalField.create("field 1", "value 1"),
                    AdditionalField.create("field 2", "value 2"),
                ],
            })

            product.update({
                name: "Product 1 updated",
                description: "Product 1 description updated",
                brand: "Brand 1 updated",
                model: "Model 1 updated",
                color: "Color 1 updated",
            })

            expect(product.name).toBe("Product 1 updated")
            expect(product.description).toBe("Product 1 description updated")
            expect(product.brand).toBe("Brand 1 updated")
            expect(product.model).toBe("Model 1 updated")
            expect(product.color).toBe("Color 1 updated")
        })
    })
})
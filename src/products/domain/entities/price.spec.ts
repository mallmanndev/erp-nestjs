import { Price } from "./price";

describe("Price", () => {
    describe("create", () => {
        it("should create a price", () => {
            // Arrange
            const price = Price.create(10, 5, "BRL");
            // Assert
            expect(price).toBeInstanceOf(Price);
            expect(price.price).toBe(10);
            expect(price.coastPrice).toBe(5);
            expect(price.currency).toBe("BRL");
        });
    });

    describe("profit", () => {
        it("should return the profit", () => {
            // Arrange
            const price = Price.create(10, 5, "BRL");
            // Assert
            expect(price.profit).toBe(5);
        });
    });
})
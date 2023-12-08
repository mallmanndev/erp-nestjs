import { Quantity } from "./quantity";

describe("Quantity", () => {
    describe("create", () => {
        it("should create a quantity", () => {
            // Arrange
            const quantity = Quantity.create(10, "kg");
            // Assert
            expect(quantity).toBeInstanceOf(Quantity);
            expect(quantity.quantity).toBe(10);
        });
    });
})
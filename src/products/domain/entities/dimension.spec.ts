import { Dimension } from "./dimension"

describe("Dimension", () => {
    describe("create", () => {
        it("should create a dimension", () => {
            // Arrange
            const dimension = Dimension.create(10, 10, 10)

            // Assert
            expect(dimension).toBeInstanceOf(Dimension)
            expect(dimension.height).toBe(10)
            expect(dimension.width).toBe(10)
            expect(dimension.depth).toBe(10)
        })
    })
})
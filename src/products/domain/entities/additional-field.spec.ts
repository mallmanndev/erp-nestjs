import { AdditionalField } from "./additional-field"

describe("AdditionalFields", () => {
    describe("create", () => {
        it("should create a aditionalFields", () => {
            // Arrange
            const aditionalFields = AdditionalField.create("AditionalFields 1", "AditionalFields 1 value")

            // Assert
            expect(aditionalFields).toBeInstanceOf(AdditionalField)
            expect(aditionalFields.name).toBe("AditionalFields 1")
            expect(aditionalFields.value).toBe("AditionalFields 1 value")
        })
    })
})
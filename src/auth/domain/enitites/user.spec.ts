import { User } from './user'

describe("Test User entity", () => {

    describe("Test validatePassword method", () => {
        let password = "12345678"


        it("Should return true when password is valid", async () => {
            const user = new User({
                id: "1",
                firstName: "Test",
                lastName: "Test",
                email: "matheusvmallmann@gmail.com",
            })
            user.setPassword(password)

            expect(await user.validatePassword(password)).toBeTruthy()
        })

        it("Should return false when password is invalid", async () => {
            const user = new User({
                id: "1",
                firstName: "Test",
                lastName: "Test",
                email: "matheusvmallmann@gmail.com",
                password
            })

            expect(await user.validatePassword("987654321")).toBeFalsy()
        })
    })
})
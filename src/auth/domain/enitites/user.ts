import * as bcrypt from 'bcrypt'

export class User {
    private _id: string
    private _firstName: string
    private _lastName: string
    private _email: string
    private _password: string
    private _tenant: string

    constructor(
        data: Partial<{
            id: string,
            firstName: string,
            lastName: string,
            email: string,
            password: string
            tenant: string
        }>
    ) {
        this._id = data.id
        this._firstName = data.firstName
        this._lastName = data.lastName
        this._email = data.email
        this._password = data.password
        this._tenant = data.tenant
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compareSync(password, this._password)
    }

    setPassword(password: string): string {
        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(password, salt)
        this._password = hash
        return hash
    }

    get id(): string {
        return this._id
    }

    get firstName(): string {
        return this._firstName
    }

    get lastName(): string {
        return this._lastName
    }

    get email(): string {
        return this._email
    }

    get tenant(): string {
        return this._tenant
    }
}
import { Event } from './events/entities/event'
import { Product } from './products/domain/entities/product'
import { Movement } from './stock/domain/entities/Movement'
import { Stock } from './stock/domain/entities/stock'

export default {
    entities: [Event, Product, Stock, Movement],
    dbName: 'postgres',
    type: 'postgresql',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
}
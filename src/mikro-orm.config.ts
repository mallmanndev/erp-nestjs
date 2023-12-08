import { Event } from './events/entities/event'
import { Product } from './products/domain/entities/product'

export default {
    entities: [Event, Product],
    dbName: 'postgres',
    type: 'postgresql',
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
}
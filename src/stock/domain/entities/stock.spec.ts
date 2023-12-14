import { Stock } from './stock';
import * as crypto from 'node:crypto'

describe('Stock', () => {
    const stockId = '3f9ccf12-11d6-4c04-b8a2-93e63ac1c122'

    beforeEach(() => {
        jest.spyOn(crypto, 'randomUUID').mockReturnValue(stockId)
    })

    describe('create', () => {
        it("Should throw an error when quantity is less than 0", () => {
            expect(() => Stock.create(
                "123",
                "Test Product",
                "units",
                -10
            )).toThrow('Quantidade inválida.')
        })

        it('should create a new stock instance', () => {
            const stockData = {
                productId: '123',
                productName: 'Test Product',
                quantityType: 'units',
                quantity: 50,
            };
            const stock = Stock.create(
                stockData.productId,
                stockData.productName,
                stockData.quantityType,
                stockData.quantity
            );

            expect(stock).toBeInstanceOf(Stock);
            expect(stock.id).toBe(stockId)
            expect(stock.productId).toBe(stockData.productId);
            expect(stock.productName).toBe(stockData.productName);
            expect(stock.quantityType).toBe(stockData.quantityType);
            expect(stock.quantity).toBe(stockData.quantity);
            expect(stock.createdAt).toBeInstanceOf(Date);
            expect(stock.movements).toHaveLength(1);
            expect(stock.movements[0].id).toBe(stockId);
            expect(stock.movements[0].type).toBe('input')
            expect(stock.movements[0].quantity).toBe(stockData.quantity)
            expect(stock.movements[0].date).toBeInstanceOf(Date);
            expect(stock.movements[0].stock_id).toBe(stockId)
        });
    })


    it('should add input movement to stock', () => {
        const stockData = {
            productId: '123',
            productName: 'Test Product',
            quantityType: 'units',
            quantity: 50,
        };
        const stock = Stock.create(
            stockData.productId,
            stockData.productName,
            stockData.quantityType,
            stockData.quantity
        );
        const inputQuantity = 20;

        stock.input(inputQuantity);

        expect(stock.movements).toHaveLength(2);
        expect(stock.quantity).toBe(stockData.quantity + inputQuantity);
    });

    it('should throw an error for invalid input quantity', () => {
        const stockData = {
            productId: '123',
            productName: 'Test Product',
            quantityType: 'units',
            quantity: 50,
        };
        const stock = Stock.create(
            stockData.productId,
            stockData.productName,
            stockData.quantityType,
            stockData.quantity
        );
        const invalidInputQuantity = -10;

        expect(() => stock.input(invalidInputQuantity)).toThrow('Quantidade inválida.');
    });

    it('should add output movement to stock', () => {
        const stockData = {
            productId: '123',
            productName: 'Test Product',
            quantityType: 'units',
            quantity: 50,
        };
        const stock = Stock.create(
            stockData.productId,
            stockData.productName,
            stockData.quantityType,
            stockData.quantity
        );
        const outputQuantity = 20;

        stock.output(outputQuantity);

        expect(stock.movements).toHaveLength(2);
        expect(stock.quantity).toBe(stockData.quantity - outputQuantity);
    });

    it('should throw an error for insufficient stock during output', () => {
        const stockData = {
            productId: '123',
            productName: 'Test Product',
            quantityType: 'units',
            quantity: 10,
        };
        const stock = Stock.create(
            stockData.productId,
            stockData.productName,
            stockData.quantityType,
            stockData.quantity
        );
        const outputQuantity = 20;

        expect(() => stock.output(outputQuantity)).toThrow('Estoque insuficiente.');
    });
});
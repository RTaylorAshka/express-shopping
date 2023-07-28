process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');
const { captureStackTrace } = require('./expressError');

let pineapple = { "name": "pineapple", "price": 4.35 }

beforeEach(() => {
    items.push(pineapple)
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('Get a list of items as JSON', async function () {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([{ "name": "pineapple", "price": 4.35 }])
    })
})

describe('POST /items', () => {
    test('Post new item to fakeDb', async function () {
        const res = await request(app).post('/items').send({
            "name": "apple",
            "price": 1.35
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            "added": {
                "name": "apple",
                "price": 1.35
            }
        })
    })
})



describe('GET /items/:name', () => {
    test('Get item as JSON by name', async function () {
        const res = await request(app).get(`/items/${pineapple.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            "name": "pineapple",
            "price": 4.35
        })
    })
    test('Get error from name not in db', async function () {
        const res = await request(app).get('/items/banana')
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({
            "error": {
                "message": "Item 'banana' not found in db",
                "status": 404
            }
        })
    })
})





describe('PATCH /items/:name', () => {
    test('Edit item by name', async function () {
        const res = await request(app).patch(`/items/${pineapple.name}`).send({
            "name": "pineapple",
            "price": 3.99
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            "updated": {
                "name": "pineapple",
                "price": 3.99
            }
        })
    })
    test('Get error from name not in db', async function () {
        const res = await request(app).patch('/items/banana').send({
            "name": "pineapple",
            "price": 3.99
        })
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({
            "error": {
                "message": "Item 'banana' not found in db",
                "status": 404
            }
        })
    })
})



describe('Delete /items/:name', () => {
    test('Delete item by name', async function () {
        const res = await request(app).delete(`/items/${pineapple.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            "message": "Deleted"
        })
    })
    test('Get error from name not in db', async function () {
        const res = await request(app).delete('/items/banana')
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({
            "error": {
                "message": "Item 'banana' not found in db",
                "status": 404
            }
        })
    })
})


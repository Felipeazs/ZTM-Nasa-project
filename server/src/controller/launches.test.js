const request = require('supertest')
const app = require('../app')

describe('test GET /launches', () => {
    test('it should response with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-type', /json/)
            .expect(200)
    })
})

describe('test POST /launches', () => {
    const launchWithDate = {
        mission: 'FAZS-TEST',
        rocket: 'NCC-21JJ',
        target: 'Kepler-186f',
        launchDate: 'August 13, 2099',
    }
    const launchWithoutDate = {
        mission: 'FAZS-TEST',
        rocket: 'NCC-21JJ',
        target: 'Kepler-186f',
    }
    const launchDateWihInvalidDate = {
        mission: 'FAZS-TEST',
        rocket: 'NCC-21JJ',
        target: 'Kepler-186f',
        launchDate: 'nothing',
    }
    test('is should response with 201 created', async () => {
        //supertest api
        const response = await request(app)
            .post('/launches')
            .send(launchWithDate)
            .expect('Content-type', /json/)
            .expect(201)

        //testing the launchDate object
        const requestDate = new Date(launchWithDate.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)

        //jest api
        expect(response.body).toMatchObject(launchWithoutDate)
    })

    //testing missing properties
    test('it should catch missing required properties', async () => {
        //supertest api
        const response = await request(app)
            .post('/launches')
            .send(launchWithoutDate)
            .expect('Content-type', /json/)
            .expect(400)

        //jest api
        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        })
    })

    //testing invalid launch date
    test('it should catch invalid dates', async () => {
        //supertest api
        const response = await request(app)
            .post('/launches')
            .send(launchDateWihInvalidDate)
            .expect('Content-type', /json/)
            .expect(400)

        //jest api
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date',
        })
    })
})

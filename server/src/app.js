const express = require('express')
const cors = require('cors')


const planetsRouter = require('./router/planets-router')

const app = express()
app.use(express.json())

//CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

//routes
app.use('/planets', planetsRouter)

module.exports = app

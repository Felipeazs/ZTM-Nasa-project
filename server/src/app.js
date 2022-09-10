const express = require('express')

const planetsRouter = require('./router/planets-router')

const app = express()
app.use(express.json())

//routes
app.use('/planets', planetsRouter)

module.exports = app

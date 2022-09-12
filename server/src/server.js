const http = require('http')
const app = require('./app')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const { loadPlanetsData } = require('./models/planets-model')

const { info, error } = require('../colors-config')

const PORT = process.env.PORT || 8001

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    info('Database connected...')
})

mongoose.connection.on('error', err => {
    error('Database connection error...', err)
})

const startServer = async () => {
    mongoose.connect(process.env.MONGO_URI)

    await loadPlanetsData()

    server.listen(PORT, async () => {
        //Load planets on initial server start
        info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
    })
}

startServer()

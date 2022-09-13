const http = require('http')
const app = require('./app')
const dotenv = require('dotenv').config()

const { connectDB } = require('./utils/db')
const { loadPlanetsData } = require('./models/planets-model')
const { loadLaunchesData } = require('./models/launches-model')

const { info, error } = require('../colors-config')

const PORT = process.env.PORT || 8001

const server = http.createServer(app)

const startServer = async () => {
    connectDB()

    await loadPlanetsData()
    await loadLaunchesData()

    server.listen(PORT, async () => {
        //Load planets on initial server start
        info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
    })
}

startServer()

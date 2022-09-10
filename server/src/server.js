const http = require('http')
const app = require('./app')
const dotenv = require('dotenv').config()

const { loadPlanetsData } = require('./models/planets-model')

const { info } = require('../colors-config')

const PORT = process.env.PORT || 8001

const server = http.createServer(app)

server.listen(PORT, async () => {
    //Load planets on initial server start
    await loadPlanetsData()

    info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})

const http = require('http')
const app = require('./app')
const dotenv = require('dotenv').config()

const { success, info, error } = require('../colors-config')

const PORT = process.env.PORT || 8001

const server = http.createServer(app)

server.listen(PORT, () => {
    info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})

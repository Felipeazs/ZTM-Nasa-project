const express = require('express')
const path = require('path')
const cors = require('cors')

const { info, error } = require('../colors-config')

const api = require('./router/api')

const app = express()
app.use(express.json())

//CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

//routes: always before serving static files
app.use('/v1', api)

//error handling
app.use((err, req, res, next) => {
    error(`${req.method}${req.baseUrl}${req.url} - ${err.status}- ${err.message.toString()}`)
    const status = err.status || 500
    const message = err.message
    res.status(status).json(message)
})

//serve the public folder statically
app.use(express.static(path.join(__dirname, '..', 'public')))

//serving the main page (front)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app

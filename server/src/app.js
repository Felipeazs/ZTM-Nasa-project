const express = require('express')
const path = require('path')
const cors = require('cors')

const api = require('./router/api')

const app = express()
app.use(express.json())

//CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

//error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json(message, data)
})

//routes: always before serving static files
app.use('/v1', api)

//serve the public folder statically
app.use(express.static(path.join(__dirname, '..', 'public')))

//serving the main page (front)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app

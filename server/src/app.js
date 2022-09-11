const express = require('express')
const path = require('path')
const cors = require('cors')

const planetsRouter = require('./router/planets-router')
const launchesRouter = require('./router/launches-router')

const app = express()
app.use(express.json())

//routes: always before serving static files
app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

//serve the public folder statically
app.use(express.static(path.join(__dirname, '..', 'public')))

//serving the main page (front)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

//CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

module.exports = app

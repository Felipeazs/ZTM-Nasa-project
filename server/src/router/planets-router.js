const express = require('express')
const router = express.Router()

const { info } = require('../../colors-config')

const { getAllPlanets } = require('../controller/planets-controller')

router.use((req, res, next) => {
    info(`${req.method}${req.baseUrl}${req.url} - ${res.statusCode}`)
    next()
})

router.get('/', getAllPlanets)

module.exports = router

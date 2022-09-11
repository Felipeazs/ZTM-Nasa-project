const express = require('express')
const router = express.Router()

const { info } = require('../../colors-config')

const { getAllLaunches } = require('../controller/launches-controller')

router.use((req, res, next) => {
    info(`${req.method}${req.baseUrl}${req.url} - ${res.statusCode}`)
    next()
})

router.get('/', getAllLaunches)

module.exports = router

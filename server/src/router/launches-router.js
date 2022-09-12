const express = require('express')
const router = express.Router()

const { info } = require('../../colors-config')

const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('../controller/launches-controller')

router.use((req, res, next) => {
    info(`${req.method}${req.baseUrl}${req.url} - ${res.statusCode}`)
    next()
})

router.get('/', httpGetAllLaunches)
router.post('/', httpAddNewLaunch)
router.delete('/:id', httpAbortLaunch)

module.exports = router

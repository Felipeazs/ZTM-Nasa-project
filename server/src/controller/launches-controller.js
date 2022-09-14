const { info, error } = require('../../colors-config')
const Launch = require('../models/launches-mongo')
const Planet = require('../models/planets-mongo')

const { getPagination } = require('../utils/query')

const httpGetAllLaunches = async (req, res, next) => {
    const { skip, limit } = getPagination(req.query)

    try {
        const launches = await Launch.find({}, { __v: 0, _id: 0 })
            .sort({ flightNumber: 1 })
            .skip(skip)
            .limit(limit)

        return res.status(200).json(launches)
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.find() in httpGetAllLaunches')
        error.status = 500
        next(error)
    }
}

const httpAddNewLaunch = async (req, res, next) => {
    const { mission, rocket, target, launchDate } = req.body

    if (!mission || !rocket || !target || !launchDate) {
        error('Please provide all the required fields')
        return res.status(400).json({ error: 'Missing required launch property' })
    }

    try {
        const planet = await Planet.findOne({ keplerName: new Date(launchDate) })

        if (!planet) {
            error('Planet not found in the database')
            return res.status(400).json({ message: 'Planet not found' })
        }
    } catch (err) {
        const error = new Error('Could not execute the query: Planet.findOne() in httAddNewLaunch')
        error.status = 500
        next(error)
    }

    try {
        const latestFlight = await Launch.findOne().sort({ flightNumber: -1 })
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.findOne() in httAddNewLaunch')
        error.status = 500
        next(error)
    }

    const newLaunch = {
        mission,
        rocket,
        target,
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: latestFlight.flightNumber + 1,
        launchDate: new Date(launchDate),
    }

    if (isNaN(newLaunch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date' })
    }

    try {
        const createdLaunch = await Launch.create(newLaunch)

        return res.status(201).json(createdLaunch)
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.create() in httAddNewLaunch')
        error.status = 500
        next(error)
    }
}

const httpAbortLaunch = async (req, res, next) => {
    const launchId = +req.params.id

    try {
        const foundLaunch = await Launch.findOne({ flightNumber: launchId })
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.findOne() in httpAbortLaunch')
        error.status = 500
        next(error)
    }

    if (!foundLaunch) {
        return res.status(400).json({ message: 'Launch not found' })
    }

    try {
        const abortedLaunch = await Launch.updateOne(
            { flightNumber: launchId },
            { upcoming: false, success: false }
        )

        return res.status(200).json(abortedLaunch)
    } catch (err) {
        const error = new Error(
            'Could not execute the query: Launch.updateOne() in httpAbortLaunch'
        )
        error.status = 500
        next(error)
    }

    return res.status(200).json(abortedLaunch)
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch }

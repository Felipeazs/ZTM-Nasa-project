const { existsLaunchWithID, abortLaunchById } = require('../models/launches-model')

const Launch = require('../models/launches-mongo')

const httpGetAllLaunches = async (req, res, next) => {
    try {
        const launches = await Launch.find({}, { __v: 0, _id: 0 })

        return res.status(200).json(launches)
    } catch (err) {
        const error = new Error('Launches not found')
        error.statusCode = 404
        next(error)
    }
}

const httpAddNewLaunch = async (req, res, next) => {
    const { mission, rocket, target, launchDate } = req.body

    if (!mission || !rocket || !target || !launchDate) {
        return res.status(400).json({ error: 'Missing required launch property' })
    }

    const latestFlight = await Launch.findOne().sort({ flightNumber: -1 })

    if (!latestFlight) {
        latestFlight.flightNumber = 100
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

    let createdLaunch

    try {
        createdLaunch = await Launch.create(newLaunch)
    } catch (err) {
        next(err)
    }

    return res.status(201).json(createdLaunch)
}

const httpAbortLaunch = async (req, res, next) => {
    const launchId = +req.params.id

    const foundLaunch = await Launch.findOne({ flightNumber: launchId })

    if (!foundLaunch) {
        return res.status(400).json({ message: 'Launch not found' })
    }

    let abortedLaunch

    try {
        abortedLaunch = await Launch.updateOne(
            { flightNumber: launchId },
            { upcoming: false, success: false }
        )
    } catch (error) {
        next(error)
    }

    return res.status(200).json(abortedLaunch)
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch }

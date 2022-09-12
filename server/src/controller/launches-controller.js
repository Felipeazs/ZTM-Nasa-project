const {
    launchesModel,
    addNewLaunch,
    existsLaunchWithID,
    abortLaunchById,
} = require('../models/launches-model')

const httpGetAllLaunches = (req, res, next) => {
    return res.status(200).json(launchesModel())
}

const httpAddNewLaunch = (req, res, next) => {
    const { mission, rocket, target, launchDate } = req.body

    if (!mission || !rocket || !target || !launchDate) {
        return res.status(400).json({ error: 'Missing required launch property' })
    }

    const newLaunch = {
        mission,
        rocket,
        target,
        launchDate: new Date(launchDate),
    }

    if (isNaN(newLaunch.launchDate)) {
        return res.status(400).json({ error: 'Invalid launch date' })
    }

    addNewLaunch(newLaunch)

    return res.status(200).json(newLaunch)
}

const httpAbortLaunch = (req, res, next) => {
    const launchId = +req.params.id

    if (!existsLaunchWithID(launchId)) {
        return res.status(400).json({ message: 'Launch not found' })
    }

    const aborted = abortLaunchById(launchId)

    return res.status(200).json(aborted)
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch }

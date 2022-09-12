const Launch = require('./launches-mongo')
const Planet = require('./planets-mongo')

const launches = new Map()

let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    launchDate: 'January 4, 2028',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
    id: 1,
}

const existsLaunchWithID = launchId => {
    return launches.has(launchId)
}

const saveLaunch = async launch => {
    try {
        const planet = await Planet.findOne({ keplerName: launch.target })

        if (!planet) {
            const error = new Error('Planet not found')
            error.statusCode = 400
            throw error
        }

        await Launch.updateOne(
            {
                flightNumber: launch.flightNumber,
            },
            launch,
            { upsert: true }
        )
    } catch (err) {
        console.log(err)
    }
}

saveLaunch(launch)

const abortLaunchById = launchId => {
    const aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}

module.exports = {
    existsLaunchWithID,
    abortLaunchById,
}

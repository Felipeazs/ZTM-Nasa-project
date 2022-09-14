const axios = require('axios')
const dotenv = require('dotenv').config()

const Launch = require('./launches-mongo')
const Planet = require('./planets-mongo')
const { info, error } = require('../../colors-config')

let latestFlightNumber = 100

const saveLaunch = async launch => {
    try {
        await Launch.updateOne(
            {
                flightNumber: launch.flightNumber,
            },
            launch,
            { upsert: true }
        )
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.updateOne() in saveLaunch')
        error.status = 500
        next(error)
    }
}

const findLaunch = async launchId => {
    try {
        return await Launch.findOne({
            flightNumber: launchId,
        })
    } catch (err) {
        const error = new Error('Could not execute the query: Launch.findOne() in findLaunch')
        error.status = 500
        next(error)
    }
}

const loadLaunchesData = async () => {
    const firstLaunch = await findLaunch(1)

    if (firstLaunch) {
        info('Spacex data already downloaded...')
        return
    }

    info('Downloading Spacex data...')

    //populate launches collection
    try {
        const res = await axios.post(`${process.env.SPACEX_API}`, {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: 'rocket',
                        select: {
                            name: 1,
                        },
                    },
                    {
                        path: 'payloads',
                        select: {
                            customers: 1,
                        },
                    },
                ],
            },
        })
    } catch (err) {
        const error = new Error('Could not execute the request to Spacex api in loadLaunchesData')
        error.status = 500
        next(error)
    }

    const launchDocs = res.data.docs

    for (const launchDoc of launchDocs) {
        const launch = {
            flightNumber: launchDoc['flight_number'],
            rocket: launchDoc['rocket']['name'],
            mission: launchDoc['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers: launchDoc['payloads'].flatMap(payload => {
                return payload['customers']
            }),
        }
        await saveLaunch(launch)
    }

    info('Spacex data loaded...')
}

module.exports = {
    loadLaunchesData,
}

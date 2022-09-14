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
        error(err.message)
    }
}

const findLaunch = async launchId => {
    try {
        return await Launch.findOne({
            flightNumber: launchId,
        })
    } catch (error) {
        error('error buscando el launch')
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

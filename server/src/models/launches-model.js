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



const launchesModel = () => {
    return Array.from(launches.values())
}

const addNewLaunch = launch => {
    latestFlightNumber++
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            customers: ['ZTM', 'NASA'],
            upcoming: true,
            flightNumber: latestFlightNumber,
        })
    )

    return launch
}

launches.set(launch.flightNumber, launch)

module.exports = {
    launchesModel,
    addNewLaunch,
}

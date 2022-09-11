const launches = new Map()

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    destination: 'Kepler-442 b',
    launchDate: 'January 4, 2028',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
    id: 1,
}

const launchesModel = () => {
    return Array.from(launches.values())
}

launches.set(launch.flightNumber, launch)

module.exports = {
    launchesModel,
}

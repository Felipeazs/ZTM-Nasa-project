const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')

const { error, info } = require('../../colors-config')

const habitablePlanets = []

const isHabitable = planet => {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    )
}

const loadPlanetsData = async () => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(
            parse({
                comment: '#',
                columns: true,
            })
        )
        .on('data', data => {
            if (isHabitable(data)) habitablePlanets.push(data)
        })
        .on('error', err => {
            error(err.message)
        })
        .on('end', () => {
            info('Planets data loaded...')
        })
}

module.exports = { loadPlanetsData, habitablePlanets }

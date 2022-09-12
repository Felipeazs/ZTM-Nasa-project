const Planet = require('../models/planets-mongo')

const getAllPlanets = async (req, res, next) => {
    try {
        const planets = await Planet.find({}, { __v: 0, _id: 0 })

        return res.status(200).json(planets)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllPlanets,
}

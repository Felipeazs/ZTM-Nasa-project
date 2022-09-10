const { habitablePlanets } = require('../models/planets-model')

const getAllPlanets = (req, res, next) => {
    return res.status(200).json(habitablePlanets)
}

module.exports = {
    getAllPlanets,
}

const planetsModel = require('../models/planets-model')

const getAllPlanets = (req, res, next) => {
    return res.status(200).json(planetsModel)
}

module.exports = {
    getAllPlanets,
}

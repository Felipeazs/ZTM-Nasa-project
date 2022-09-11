const { launchesModel } = require('../models/launches-model')

const getAllLaunches = (req, res, next) => {
    return res.status(200).json(launchesModel())
}

module.exports = { getAllLaunches }

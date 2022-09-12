const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const { info, error } = require('../../colors-config')

mongoose.connection.once('open', () => {
    info('Database connected...')
})

mongoose.connection.on('error', err => {
    error('Database connection error...', err)
})

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
}

const disconnectDB = () => {
    mongoose.disconnect()
}

module.exports = {
    connectDB,
    disconnectDB,
}

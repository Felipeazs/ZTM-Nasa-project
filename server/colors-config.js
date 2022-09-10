const colors = require('colors')

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: ['grey', 'bold', 'underline'],
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: ['blue', 'bold', 'underline'],
    error: ['red', 'bold'],
})

const timestamp = new Date().toLocaleTimeString()

const format = (msg, log) => {
    return console.log(`${timestamp} - ${log}: ${msg}`)
}

const info = msg => {
    format(msg.debug, 'info')
}
const prompt = msg => {
    format(msg.prompt, 'prompt')
}
const success = msg => {
    format(msg.info, 'success')
}
const warn = msg => {
    format(msg.warn, 'warn')
}
const error = msg => {
    format(msg.error, 'error')
}

module.exports = {
    success,
    info,
    error,
}

const bot = require('./bot.js')

exports.setDisp = async (message) => {
    bot.setDispatch(message, undefined)
}

const bot = require('./bot.js')

exports.setDisp = async (message) => {
    bot.setDispatch(message, undefined)
}

exports.setSlashDisp = async (interaction, member) => {
    bot.setDispatchSlash(interaction, member)
}

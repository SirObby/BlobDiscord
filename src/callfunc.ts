import { bot } from "./command"

exports.setDisp = async (message) => {
    bot.setDispatch(message, undefined)
}

exports.setSlashDisp = async (interaction, member) => {
    bot.setDispatchSlash(interaction, member)
}

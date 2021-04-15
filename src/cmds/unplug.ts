import { bot } from "../command"
import { Discord } from "../bot"

export const init = (command) => {
    console.log(`${command} has been initialised!`)
}

export const execute = (message, command, args, client) => {

    if(message.author.id == "571362310778781697") {
        process.exit(0)
    }

}
import { bot } from "../command"
import { Discord } from "../bot"
import { secondsToString } from "../bot"


export const init = (command) => {
    console.log(`${command} has been initialised!`)
}


export const execute = (message, command, args, client) => {

    message.channel.send('Checking Uptime...').then (msg => {
        msg.edit(`Uptime: ${secondsToString(process.uptime())}`);
    })

}
import { bot } from "../command"
import { Discord } from "../bot"

export const init = (command) => {
    console.log(`${command} has been initialised!`)
}

export const execute = (message, command, args, client) => {

    message.channel.send('Pinging...').then (msg => {
        msg.edit(`Latency is: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
    })

}
import { bot } from "../command"
import { Discord } from "../bot"
import { secondsToString } from "../bot"


exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}


exports.execute = (message, command, args, client) => {

    message.channel.send('Checking Uptime...').then (msg => {
        msg.edit(`Uptime: ${secondsToString(process.uptime())}`);
    })

}
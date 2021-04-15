export const bot = require('./bot.js')
let cache = []
let prefix = "blob"

import { fs } from "./bot"
import { configs } from "./bot"

exports.init = () => {

    console.log("Commands Initialized!")

}

exports.exec = async (message, client) => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    try {

        
            const cmd = await import(`./cmds/${command}.js`);

        //const cmd = require(`./cmds/${command}.js`)

        if (configs.autoupdate) {

            delete require.cache[require.resolve(`./cmds/${command}.js`)];
            cmd.init(command)

        } else {

            if (!cache.includes(command)) {
                cache.push(command)
                cmd.init(command)

            }

        }

        cmd.execute(message, command, args, client)

    } catch (e) {

        console.log(e)

    }
}
import { bot } from "./command"
import { Discord } from "./bot"
import { fs } from "./bot"

exports.init = () => {

    console.log("CommandHandler has been Initialized!")

}

exports.exec = (interaction, client) => {

    console.log(interaction)
    console.log(interaction.data.options)

        try {

            const cmd = require(`./slashes/${interaction.data.name}.js`)

            let args = {}

            /*interaction.data.options.forEach(element => {
                
                args[element.name] = element.value

            });*/

            cmd.execute(interaction, args, client);

        } catch (e) {
            console.log(e)
        }
        
    


    /*const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    try {

        const cmd = require(`./cmds/${command}.js`)

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

    }*/
}

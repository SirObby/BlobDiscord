import { bot } from "../command"
import { Discord } from "../bot"

exports.init = (command) => {
    console.log(`${command} has been initialised!`)

}

exports.execute = async (message, command, args, client) => {

    if (message.member.voice.channel) {

        let queue = bot.getQueue

        let connection = await message.member.voice.channel.join();
        if (queue[message.guild.id].length == 1) {
            return message.reply('You can\'t skip if there is nothing to play after this!');
        } else {
            //message.react('👍')

            const skipped = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription(`You have skipped this song!`)
            ;

            message.channel.send(skipped)
            
            queue[message.guild.id].shift();
            
            let msg = undefined;

            bot.changeQueue(queue)
            bot.setDispatch(message, msg);
        }

    } else {
        message.reply('you need to be in a voice channel to use this command!')
    }

}


/*

*/
const Discord = require('discord.js');
const commandHandler = require('../command.js');
const bot = require('../bot.js')
const ytdl = require('ytdl-core');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)

}

exports.execute = async (message, command, args, client) => {


        let queue = bot.getQueue
        let dispatcher = bot.getDisp

        if (message.member.voice.channel) {

            let msg = undefined;

            queue[message.guild.id] = undefined;
            bot.getQueue(queue)
            message.member.voice.channel.leave()

            const left = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription(`I have left.`)
            ;

            message.channel.send(left)

        } else {
        
            message.reply('you need to be in a voice channel to use this command!');
        }


}


/*

*/

/**/
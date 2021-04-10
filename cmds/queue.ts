const Discord = require('discord.js');
const commandHandler = require('../command.js');
const bot = require('../bot.js')
const ytdl = require('ytdl-core');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)

}

exports.execute = async (message, command, args, client) => {

    let queue = bot.getQueue

   // message.react('💬')

    let embed = new Discord.MessageEmbed()
        .setTitle('Music Playlist')
        .setColor(0x7289da)
    let songList = '';
    let currentSongNumber = '';
    for (length in queue[message.guild.id]) {
        if (length == 0) {
            currentSongNumber = '**Currently Playing:** ';
        } else {
            currentSongNumber = `**${length}.** `
        }
        songList += `${currentSongNumber} ${queue[message.guild.id][length].title}\n**Requested By:** ${queue[message.guild.id][length].requested_by}\n\n`
    }

    if(songList != "") {
        embed.setDescription(songList);
    } else {
        embed.setDescription("There are no songs playing currently!")
    }

    message.channel.send(embed);

}
import { bot } from "../command"
import { Discord } from "../bot"

export const init = (command) => {
    console.log(`${command} has been initialised!`)

}

export const execute = async (message, command, args, client) => {

    let queue = bot.getQueue

   // message.react('💬')

    let embed = new Discord.MessageEmbed()
        .setTitle('Music Playlist')
        .setColor(0x7289da)
    let songList = '';
    let currentSongNumber = '';
    for (length as unknown as string in queue[message.guild.id]) {
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
import { bot } from "../command"
import { Discord } from "../bot"

exports.execute = async (interaction, args, client) => {

    /*return client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "Music commands in slash commands are broken, use `blobqueue` instead",
            flags: 64
          }
        }
      })*/

    let queue = bot.getQueue

    console.log("queue")
    let embed = new Discord.MessageEmbed()
        .setTitle('Music Playlist')
        .setColor(0x7289da)
    let songList = '';
    let currentSongNumber = '';
    for (length as unknown as string in queue[interaction.guild_id]) {
        if (length == 0) {
            currentSongNumber = '**Currently Playing:** ';
        } else {
            currentSongNumber = `**${length}.** `
        }
        songList += `${currentSongNumber} ${queue[interaction.guild_id][length].title}\n**Requested By:** ${queue[interaction.guild_id][length].requested_by}\n\n`
    }

    if(songList != "") {
        embed.setDescription(songList);
    } else {
        embed.setDescription("There are no songs playing currently!")
    }

        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                content: "The queue:",
              embeds: [embed],
            }
          }})

}
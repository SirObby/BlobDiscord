const Discord = require('discord.js');
const bot = require('../bot.js')
const ytdl = require('ytdl-core');

exports.execute = async (interaction, args, client) => {

  /*return client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "Music commands in slash commands are broken, use `blobskip` instead",
        flags: 64
      }
    }
  })
*/
  console.log(interaction.member.user.id)
  console.log(interaction.guild_id)

  let member = await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member.user.id)

    console.log(member)

    if (member.voice.channel) {

        var queue = bot.getQueue()

        console.log(queue[interaction.guild_id])

        connection = await member.voice.channel.join();
        if (queue[interaction.guild_id].length() == 1) {
            return message.reply('You can\'t skip if there is nothing to play after this!');
        } else {
            //message.react('👍')

            const skipped = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription(`You have skipped this song!`)
            ;

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: "Loading..",
                  embeds: [skipped],
                }
              }})
            
            queue[interaction.guild_id].shift();

            bot.changeQueue(queue)
            bot.setDispatchSlash(interaction, member);
        }

    } else {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
              content: `You need to be in an voice channel!`,
              flags: 64
            }
          }})
    }

        

}
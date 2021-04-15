import { bot } from "../command"
import { Discord } from "../bot"

export const execute = async (interaction, args, client) => {

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

        let connection = await member.voice.channel.join();
        if (queue[interaction.guild_id].length() == 1) {
            return client.api.interactions(interaction.id, interaction.token).callback.post({data: {
              type: 4,
              data: {
                content: `You cant skip if there is nothing after this!`,
                flags: 64
              }
            }})
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
import { bot } from "../command"
import { Discord } from "../bot"

export const execute = async (interaction, args, client) => {

  /*return client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "Music commands in slash commands are broken, use `blobstop` instead",
        flags: 64
      }
    }
  })*/

  let member = await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member.user.id)

    if (member.voice.channel) {

        let queue = bot.getQueue()
        let dispatcher = bot.getDisp()

        let connection = await member.voice.channel.join();

            let msg = undefined;

            queue[interaction.guild_id] = undefined;
            bot.changeQueue(queue)
            member.voice.channel.leave()

            const left = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription(`I have left.`)
            ;


            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                  content: "Loading..",
                  embeds: [left],
                }
              }})

        

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
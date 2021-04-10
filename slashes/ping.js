const Discord = require('discord.js');

exports.execute = (interaction, args, client) => {

    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: `${Discord.SnowflakeUtil.deconstruct(interaction.id).timestamp - Date.now()}ms (this might not be accurate at all)`,
          flags: 64
        }
      }})

}

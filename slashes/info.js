const Discord = require('discord.js');

exports.execute = (interaction, args, client) => {

  const embed = new Discord.MessageEmbed()

    .setTitle('BlobDiscord')

    .setColor(0x7289da)

    //.setDescription('To view anything run <help> <argument>')
    .addField(`Information`, `[Invite](https://discord.com/api/oauth2/authorize?client_id=795196567241883659&permissions=8&scope=bot) [Support Server](https://discord.gg/dNfDBUC6Tu)\nMade By \`Sir Obsidian#2640\``, true)

  ;

  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "Here's some information!",
        embeds: [embed]
      }
    }
  })

}
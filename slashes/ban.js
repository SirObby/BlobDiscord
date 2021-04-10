/*const Discord = require('discord.js');

exports.execute = (interaction, args, client) => {
    let guild = client.guilds.cache.get(interaction.guild_id)
    let user = client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member.user.id)
    
    console.log("e" + interaction.member.user.id)

    if(user.hasPermission('BAN_MEMBERS')) {

        let member = client.guilds.cache.get(interaction.guild_id).members.fetch(arr.find(x => x.name ==='user').value)

        console.log(member)

    } else {

    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: `No permission.`,
          flags: 64
        }
      }})
    }
}

Slash commands still do not really work please help me make this work!

*/ 

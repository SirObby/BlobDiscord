const Discord = require('discord.js');
const commandHandler = require('../command.js');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

exports.execute = (message, command, args, client) => {

    if(message.author.id == "571362310778781697") {
        try {

            const embed = new Discord.MessageEmbed()
        .setColor(0x7289da)
        .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL(), undefined)
        .setTitle("Eval")
        .setDescription(`Output: \`\`\`${eval(args.join(" "))}\`\`\``);

            message.channel.send(embed)
        } catch (e) {

            const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL(), undefined)
        .setTitle("Eval")
        .setDescription(`Error: \`\`\`${e}\`\`\``);

            message.channel.send(embed)

            //message.channel.send(`\`\`\`${e}\`\`\``)
        }
        }

}

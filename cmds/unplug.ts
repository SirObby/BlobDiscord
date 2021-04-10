const Discord = require('discord.js');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

exports.execute = (message, command, args, client) => {

    if(message.author.id == "571362310778781697") {
        process.exit(0)
    }

}
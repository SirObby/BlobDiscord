const Discord = require('discord.js');
const fetch = require('node-fetch');

function secondsToString(seconds) {
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var seconds = Math.floor(seconds % 60);

    var str = "";

    if (days > 0) {
        str += days + ":";
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    str += `${days}:${hours}:${minutes}:${seconds}`

    return str;
}

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

exports.execute = (message, command, args, client) => {

    message.channel.send('Checking...').then (msg => {

		msg.edit(`GuildCount: ${client.guilds.cache.size}\nMemberCount: ${client.users.cache.size}\nRAM: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}MB\nUPTIME: ${secondsToString(process.uptime())} (Dosent display correclty)`)

		/*
        const promises = [
            			client.shard.fetchClientValues('guilds.cache.size'),
            			client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
            		];
            
            		return Promise.all(promises)
            			.then(results => {
            				const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            				const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            				return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
            			})
            			.catch(console.error);
            
*/
    })

}


/* */
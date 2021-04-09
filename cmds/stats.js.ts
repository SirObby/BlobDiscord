const Discord = require('discord.js');
const fetch = require('node-fetch');

exports.init = (command) => {
    console.log(`${command} has been initialised!`)
}

exports.execute = (message, command, args, client) => {

    message.channel.send('Checking...').then (msg => {

		msg.edit(`GuildCount: ${client.guilds.cache.size}\nMemberCount: ${client.users.cache.size}`)

		fetch(`https://discordbotlist.com/api/v1/bots/795196567241883659/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijc5NTE5NjU2NzI0MTg4MzY1OSIsImlhdCI6MTYxNDk3MTIwM30.PisFhnCJ-mPrEDhAJJrIiJfMvghmk6MaOb82AHzRZDc'
            },
            body: JSON.stringify({
                users: client.users.cache.size,
                guilds: client.guilds.cache.size
            })
        });

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
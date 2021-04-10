import { bot } from "../command"
import { Discord } from "../bot"
import { secondsToString } from "../bot"

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
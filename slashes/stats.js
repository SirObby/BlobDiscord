const Discord = require('discord.js');

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

exports.execute = async (interaction, args, client) => {

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

    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
        type: 4,
        data: {
          content: `GuildCount: ${client.guilds.cache.size}\nMemberCount: ${client.users.cache.size}\nRAM: ${Math.floor(process.memoryUsage().heapUsed / 1024 / 1024)}MB\nUPTIME: ${secondsToString(process.uptime())} (Dosent display correclty)`,
          flags: 64
        }
      }})

}

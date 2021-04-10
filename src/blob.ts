exports.check = (arr) => {

let l = arr.length

if(Date.now() - arr[l - 7].split('|next|')[0] < 10000) {
    return true;
} else {
    return false;
}

}
/*
exports.guildCount = () => {
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
    ];
    
    Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
//            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return totalGuilds;
        })
        .catch(console.error);
}

exports.memberCount = () => {
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
    ];
    
    Promise.all(promises)
        .then(results => {
//            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return totalMembers;
        })
        .catch(console.error);
}
*/
exports.delete = async (arr, message) => {
    let timett = (Date.now() - arr[arr.length - 7].split('|next|')[0]) / 1000
    let index = 0;
    try {
    arr.forEach(ele => {
        index++
        let e = ele.split('|next|')
        
        message.channel.messages.cache.get(e[1]).delete()

    });
    } catch(e) {
        console.log(e)
    }

    message.channel.send(`<:delete:787038088010399778> Deleted ${index} by ${message.author.username}#${message.author.discriminator}`)

                let myRole = message.guild.roles.cache.find(role => role.name === "Muted");

                if (myRole != undefined) {

                    message.member.roles.add(myRole)

                    message.channel.send(`<:locked_channel:787018218098393120> Successfully muted ${message.author.username}#${message.author.discriminator} for ${Math.floor(index * 20)}s (${index} / ${timett}s)`)



                    try {
                        message.author.send(`<:locked_channel:787018218098393120> You have been automatically muted for ${Math.floor(index * 20)} seconds (${index} / ${timett}s)`)
                    } catch (e) {

                    }

                    setTimeout(() => {

                        try {
                            message.member.roles.remove(myRole)
    } catch(e) {
        console.log(e)
    }

                    }, index * 20 * 1000);
                } else {
                    message.channel.send(`❌ Unable to mute ${message.author.username}#${message.author.discriminator} because: \`\`Role named "Muted" does not exist\`\``)
                }

}
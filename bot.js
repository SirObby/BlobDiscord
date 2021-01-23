const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./configs.json')
const fs = require("fs")
const site = require('./website.js')

const command = require('./command.js')
let toggle = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    command.init()
    site.init(client)
    let statuses = [
        `Users.`,
        `Servers.`,
        `AntiRaid Measures`,
        `Discord`,
        `Money`,
        `Puny Humans`,
        `Humans`,
        `Life`,
        `to life universe and everything`,
        `Your Money`,
        `Blobs`,
        `Something I dunno`
    ]

    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {
            type: 'WATCHING'
        });
    }, 6000)

    setInterval(() => {
        toggle++

        if(toggle == 2) {
            toggle = 0
        }

        //client.user.setAvatar(`./Blob${toggle}.png`);

    }, 3600000);


});

client.on('message', message => {

    if(message.guild == undefined) return;

    if (message.author.bot == true) return;


    if(message.content.startsWith("blob")) {

        command.exec(message, client);

    }
    //

    if (fs.existsSync(`./Servers/${message.guild.id}.json`)) {

        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}.json`, 'utf8'));
        console.log(content)
        let found = false;

        let id = "";
        let msgs = []
        let time;
        let messages;
        let mentions;
        let links;
        let warns;

        content.Users.forEach(element => {

            if (element.id == message.author.id) {
                found = true

                id = element.id
                msgs = element.msgs
                time = element.time
                messages = element.messages
                mentions = element.mentions
                links = element.links
                warns = element.warns

                element.messages++
                element.msgs.push(message.id)

                element.mentions = element.mentions + message.mentions.users.array.length
                /*
                if (message.mentions.members.first() != undefined) {

                    let yes = message.content.slice("<@")

                    element.mentions = element.mentions + yes.length
                }*/

                try {
                    /*
                    let why = message.content.slice("https://")
                    let whyy = message.content.slice("http://")

                        element.links = element.links + why.length + whyy.length*/
                } catch (e) {
                    console.log(e)
                }
                //console.log(message.mentions.members.first())
            }

        });

        if (found == true) {

            if(message.member.hasPermission("MANAGE_CHANNELS") || message.member.hasPermission("MANAGE_ROLES")) return; 

            let timett = (Date.now() - time) / 1000

            if(Date.now() - time > 10000) {

                content.Users.forEach(element => {

                    if (element.id == message.author.id) {
                        element.msgs = []
                        element.time = Date.now()
                        element.messages = 1
                        element.mentions = 0
                        element.links = 0
                    }

                });

            }

            if (mentions > 5) {

                let index = 0;
        
                msgs.forEach(element => {
                    try {
                        message.channel.messages.cache.get(element).delete()
                        index++
                    } catch (e) {
                        console.log(e)
                    }
                });
                message.channel.send(`<:delete:787038088010399778> Deleted ${index} by ${message.author.username}#${message.author.discriminator}`)
        
                let myRole = message.guild.roles.cache.find(role => role.name === "Muted");
        
                if (myRole != undefined) {
        
                    message.member.roles.add(myRole)
        
                    message.channel.send(`<:locked_channel:787018218098393120> Successfully muted ${message.author.username}#${message.author.discriminator} for ${Math.floor(mentions * 20)}s (${mentions} / ${timett}s)`)
        
                    try {
                        message.author.send(`<:locked_channel:787018218098393120> You have been automatically muted for ${Math.floor(mentions * 20)} seconds (${mentions} / ${timett}s)`)
                    } catch (e) {
        
                    }
        
                    setTimeout(() => {
        
                        message.member.roles.remove(myRole)
        
                    }, mentions * 20 * 1000);
                } else {
                    message.channel.send(`❌ Unable to mute ${message.author.username}#${message.author.discriminator} because: \`\`Role named "Muted" does not exist\`\``)
                }

                content.Users.forEach(element => {

                    if (element.id == message.author.id) {
                        element.msgs = []
                        element.time = Date.now()
                        element.messages = 1
                        element.mentions = 0
                        element.links = 0
                    }

                });
        
            }
        
            if (links > 5) {

                content.Users.forEach(element => {

                    if (element.id == message.author.id) {
                        element.msgs = []
                        element.time = Date.now()
                        element.messages = 1
                        element.mentions = 0
                        element.links = 0
                    }

                });
        
                let index = 0;
        
                msgs.forEach(element => {
                    try {
                        message.channel.messages.cache.get(element).delete()
                        index++
                    } catch (e) {
                        console.log(e)
                    }
                });
                message.channel.send(`<:delete:787038088010399778> Deleted ${index} by ${message.author.username}#${message.author.discriminator}`)
        
                let myRole = message.guild.roles.cache.find(role => role.name === "Muted");
        
                if (myRole != undefined) {
        
                    message.member.roles.add(myRole)
        
                    message.channel.send(`<:locked_channel:787018218098393120> Successfully muted ${message.author.username}#${message.author.discriminator} for ${Math.floor(links * 10)}s (${links} / ${timett}s)`)
        
                    try {
                        message.author.send(`<:locked_channel:787018218098393120> You have been automatically muted for ${Math.floor(links * 10)} seconds (${links} / ${timett}s)`)
                    } catch (e) {
        
                    }
        
                    setTimeout(() => {
        
                        message.member.roles.remove(myRole)
        
                    }, links * 10 * 1000);
                } else {
                    message.channel.send(`❌ Unable to mute ${message.author.username}#${message.author.discriminator} because: \`\`Role named "Muted" does not exist\`\``)
                }
        
            }
        
            if (messages > 7) {

                content.Users.forEach(element => {

                    if (element.id == message.author.id) {
                        element.msgs = []
                        element.time = Date.now()
                        element.messages = 1
                        element.mentions = 0
                        element.links = 0
                    }

                });

                let index = 0;
        
                msgs.forEach(element => {
                    try {
                        message.channel.messages.cache.get(element).delete()
                        index++
                    } catch (e) {
                        console.log(e)
                    }
                });
                message.channel.send(`<:delete:787038088010399778> Deleted ${index} by ${message.author.username}#${message.author.discriminator}`)
        
                let myRole = message.guild.roles.cache.find(role => role.name === "Muted");
        
                if (myRole != undefined) {
        
                    message.member.roles.add(myRole)
        
                    message.channel.send(`<:locked_channel:787018218098393120> Successfully muted ${message.author.username}#${message.author.discriminator} for ${Math.floor(messages * 10)}s (${messages} / ${timett}s)`)
        
                    try {
                        message.author.send(`<:locked_channel:787018218098393120> You have been automatically muted for ${Math.floor(messages * 10)} seconds (${messages} / ${timett}s)`)
                    } catch (e) {
        
                    }
        
                    setTimeout(() => {
        
                        message.member.roles.remove(myRole)
        
                    }, messages * 10 * 1000);
                } else {
                    message.channel.send(`❌ Unable to mute ${message.author.username}#${message.author.discriminator} because: \`\`Role named "Muted" does not exist\`\``)
                }

                
            }


            /*if (time == 0) {

                content.Users.forEach(element => {

                    if (element.id == message.author.id) {
                        element.time = Date.now()
                    }

                });

                setTimeout(() => {

                    stuff.check(id, msgs, time, messages, mentions, links, message, client)

                        setTimeout(() => {

                            content.Users.forEach(element => {

                                if (element.id == message.author.id) {
                                    element.msgs = []
                                    element.time = 0
                                    element.messages = 1
                                    element.mentions = 0
                                    element.links = 0
                                }

                            });

                        }, 1000);

                }, 10000);

                setTimeout(() => {
                    
                    content.Users.forEach(element => {

                        if (element.id == message.author.id) {
                            element.msgs = []
                            element.time = 0
                            element.messages = 1
                            element.mentions = 0
                            element.links = 0
                            fs.writeFileSync(`./Servers/${message.guild.id}.json`, JSON.stringify(content, null, 4));
                        }

                    });

                }, 11000);

            }*/
        } else {

            content.Users.push(JSON.parse(`{ "id": ${message.author.id}, "time":0, "messages": 1, "msgs": [], "mentions": 0, "links": 0, "warms": 0 }`))

        }
        fs.writeFileSync(`./Servers/${message.guild.id}.json`, JSON.stringify(content, null, 4));
    } else {

        fs.writeFile("./Servers/" + message.guild.id + ".json", `{ "Users": [], "Cache": [], "Warns": [], "configs": { "interval": 10, "messages": {"max": 7}, "mentions": {"max": 5}  } }`, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

    }
});

client.login(configs.token);
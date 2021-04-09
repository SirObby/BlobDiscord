const Discord = require('discord.js');
const client = new Discord.Client();
const configs = require('./configs.json')
const fs = require("fs")
const site = require('./website.js')
const Utilities = require('./Utilities.js')
const BLOB = require('./blob.js')
const uniqid = require('uniqid');
const fetch = require('node-fetch');
//const sharder = require('./shard.js');

const command = require('./command.js')
let toggle = 0;

const ytdl = require('ytdl-core');

const callfunc = require('./callfunc.js');

let queue = [];
let connection;
let dispatcher;
let loop;

exports.setConnection = async (c) => {
    connection = c;   
}

exports.setDisp = async (d) => {
    dispatcher = d;   
}

exports.getDisp = async () => {
    return dispatcher;
  };

exports.getQueue = async () => {
    return queue;
  };

exports.changeQueue = async (q) => {

    queue = q;   

}

exports.setDispatch = async (message, msg) => {
try {
    connection = await message.member.voice.channel.join();

    dispatcher = connection.play(ytdl(queue[message.guild.id][0].url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }))

    dispatcher.on('error', async err => {
        console.error(err)
    })

    dispatcher.on('finish', async () => {
        if (!queue[message.guild.id].length) {
            const endeded = new Discord.MessageEmbed()

            .setColor(0x7289da)

            .setDescription(`Nothing left to play!`)
            ;

            message.channel.send(endeded)


            message.member.voice.channel.leave();
            return;
        }
        queue[message.guild.id].shift();
        callfunc.setDisp(message)
    })

    songEmbedYTDL = new Discord.MessageEmbed()
        .setTitle(`**${queue[message.guild.id][0].title}** is playing`)
        .setColor(0x7289da)
        .addField('Song Length:', `${Utilities.secondsToString(queue[message.guild.id][0].video_length)}`, true)
        .addField('Author:', queue[message.guild.id][0].author.name, true)
        .addField('Suggested By:', queue[message.guild.id][0].requested_by, false)

    /*if(queue[message.guild.id][0].video_thumb.thumbnails[4]) {
        songEmbedYTDL.setImage(queue[message.guild.id][0].video_thumb.thumbnails[4].url);
    } else {
        songEmbedYTDL.setImage(queue[message.guild.id][0].video_thumb.thumbnails[3].url)
    }*/
    if(msg != undefined) {
    msg.edit(songEmbedYTDL)
    } else {
        message.channel.send(songEmbedYTDL)
    }
} catch(e) {
    console.log(e)
}
};

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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    command.init()
    /*
    if(sharder.checkSite == true) {
        sharder.siteOn()
        site.init(client)
    }*/
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
        `Something I dunno`,
        `my uptime ${secondsToString(process.uptime())}`,
        `my patreon patreon.com/mellab`,
        `for messages starting with blob`,
        `my prefix is blob`
    ]

    setInterval(function () {
        let status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, {
            type: 'WATCHING'
        });
        try {
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
    } catch(e) {
        console.log(e)
    }
    }, 6000)


});

client.on('message', message => {

    if (message.guild == undefined) return;

    if (message.author.bot == true) return;


    if (message.content.startsWith("blob")) {

        command.exec(message, client);

    }
    //

    if (fs.existsSync(`./Servers/${message.guild.id}.json`)) {
        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}.json`, 'utf8'));

        if(content.Data.Users[message.author.id] == undefined) {

            content.Data.Users[message.author.id] = {"Messages": [`${message.createdTimestamp}|next|${message.id}`], "Muted": {"is": false}}

        } else {

            content.Data.Users[message.author.id].Messages.push(`${message.createdTimestamp}|next|${message.id}`)            

        }

        if(content.Data.Users[message.author.id].Messages.length > 7 ) {

            let arr = content.Data.Users[message.author.id].Messages;

            if(BLOB.check(content.Data.Users[message.author.id].Messages)) {

                content.Data.Users[message.author.id].Messages = []

                BLOB.delete(arr, message)

            } 

        }

        if(content.Data.Users[message.author.id].Messages.length > 29 ) {

            content.Data.Users[message.author.id].Messages = []

        }

        fs.writeFileSync(`./Servers/${message.guild.id}.json`, JSON.stringify(content, null, 4));
    } else {

        fs.writeFile("./Servers/" + message.guild.id + ".json", `{ "Data": {"Users": {}} }`, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

    }
});

client.login(configs.token);